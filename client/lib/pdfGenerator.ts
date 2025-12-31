/**
 * PDF Generator Utility
 * Generates professional PDF reports from verification data
 */

import { jsPDF } from "jspdf";

/**
 * Format key names for display
 * Converts snake_case and camelCase to Title Case
 */
const formatKeyName = (key: string): string => {
  return key
    .replace(/[._]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
};

/**
 * Recursively flatten nested objects for display in PDF
 * Handles arrays and nested objects from API responses
 */
const flattenDataForDisplay = (data: Record<string, any>, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[fullKey] = 'N/A';
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        flattened[fullKey] = 'N/A';
      } else if (value.every(item => typeof item === 'string' || typeof item === 'number')) {
        // Simple array of strings/numbers - join them
        flattened[fullKey] = value.filter(v => v !== '').join(', ') || 'N/A';
      } else if (value.every(item => typeof item === 'object' && item !== null)) {
        // Array of objects - flatten each object with index
        value.forEach((item, index) => {
          const itemPrefix = `${fullKey} [${index + 1}]`;
          Object.assign(flattened, flattenDataForDisplay(item, itemPrefix));
        });
      } else {
        // Mixed array or other complex structure - show as JSON
        flattened[fullKey] = JSON.stringify(value, null, 2);
      }
    } else if (typeof value === 'object' && value !== null) {
      const hasData = Object.values(value).some(v => v !== null && v !== undefined && v !== '');
      if (!hasData) {
        flattened[fullKey] = 'N/A';
      } else {
        Object.assign(flattened, flattenDataForDisplay(value, fullKey));
      }
    } else if (typeof value === 'boolean') {
      flattened[fullKey] = value ? 'Verified' : 'Not Verified';
    } else {
      flattened[fullKey] = value === '' ? 'N/A' : value;
    }
  });

  return flattened;
};

interface VerificationData {
  type: string;
  query: string;
  timestamp: string;
  creditsUsed: number;
  data?: Record<string, any>;
  userInfo?: {
    name: string;
    email: string;
    phone?: string;
  };
}

/**
 * Generate and download a PDF report from verification data
 */
export const generatePDFReport = (verificationData: VerificationData): void => {
  try {
    const doc = new jsPDF();
    
    // --- Header Section ---
    // Left side - Report Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Verification Report", 10, 20);

    // Right side - User Info (if available)
    if (verificationData.userInfo) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      
      const rightX = 200; // Right margin
      let rightY = 15;
      
      // User Name
      doc.text(verificationData.userInfo.name, rightX, rightY, { align: 'right' });
      rightY += 4;
      
      // Email
      doc.text(verificationData.userInfo.email, rightX, rightY, { align: 'right' });
      rightY += 4;
      
      // Phone (if available)
      if (verificationData.userInfo.phone) {
        doc.text(verificationData.userInfo.phone, rightX, rightY, { align: 'right' });
      }
    }

    // Verification Type
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Type: ${verificationData.type}`, 10, 28);
    doc.text(`Query: ${verificationData.query}`, 10, 33);
    
    // Timestamp
    const verifiedTime = new Date(verificationData.timestamp).toLocaleString();
    doc.text(`Verified on ${verifiedTime}`, 10, 38);
    
    // Credits used
    doc.text(`Credits Used: ${verificationData.creditsUsed}`, 10, 43);
    
    // Horizontal line separator
    doc.setDrawColor(220, 220, 220);
    doc.line(10, 48, 200, 48);

    // --- Verification Results Title ---
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "bold");
    doc.text("VERIFICATION RESULTS", 10, 58);

    // --- Data Grid ---
    let yPos = 68;
    const col1X = 10;
    const col2X = 110;
    const cardWidth = 90;
    const minCardHeight = 22;
    const gutter = 5;
    const lineHeight = 5;
    const labelHeight = 8;
    const padding = 3;
    
    if (verificationData.data) {
      const flattenedData = flattenDataForDisplay(verificationData.data);
      
      // Filter out client_id and other sensitive fields
      const filteredEntries = Object.entries(flattenedData).filter(([key]) => {
        const skipKeys = ['client_id'];
        return !skipKeys.some(skipKey => key.toLowerCase().includes(skipKey.toLowerCase()));
      });

      // Process entries in pairs for 2-column layout
      let leftColumnHeight = 0;
      let rightColumnHeight = 0;
      
      for (let i = 0; i < filteredEntries.length; i++) {
        const [key, value] = filteredEntries[i];
        
        // Determine column position (alternate between left and right)
        const isLeftColumn = i % 2 === 0;
        const xPos = isLeftColumn ? col1X : col2X;

        // Calculate content dimensions
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        const valueStr = String(value);
        const maxWidth = cardWidth - (2 * padding);
        const lines = doc.splitTextToSize(valueStr, maxWidth);
        
        // Calculate dynamic card height based on content
        // Formula: label space + (number of lines * line height) + padding
        const contentHeight = labelHeight + (lines.length * lineHeight) + padding;
        const cardHeight = Math.max(minCardHeight, contentHeight);
        
        // Check if we need a new page
        const requiredSpace = yPos + cardHeight;
        if (requiredSpace > 270) {
          doc.addPage();
          yPos = 20;
          leftColumnHeight = 0;
          rightColumnHeight = 0;
        }

        // Draw card background
        doc.setFillColor(248, 248, 248);
        doc.setDrawColor(220, 220, 220);
        doc.rect(xPos, yPos, cardWidth, cardHeight, 'FD');

        // Draw label (key)
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120, 120, 120);
        doc.text(formatKeyName(key), xPos + padding, yPos + 5);

        // Draw value - show all lines (no truncation)
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 40, 40);
        
        lines.forEach((line: string, lineIndex: number) => {
          const lineY = yPos + 12 + (lineIndex * lineHeight);
          doc.text(line, xPos + padding, lineY);
        });

        // Track column heights for proper alignment
        if (isLeftColumn) {
          leftColumnHeight = cardHeight;
        } else {
          rightColumnHeight = cardHeight;
          // Move to next row after both columns are filled
          // Use the maximum height of the two cards
          const maxHeight = Math.max(leftColumnHeight, rightColumnHeight);
          yPos += maxHeight + gutter;
          leftColumnHeight = 0;
          rightColumnHeight = 0;
        }
      }
      
      // If odd number of entries, move yPos for the last unpaired card
      if (filteredEntries.length % 2 !== 0) {
        yPos += leftColumnHeight + gutter;
      }
    } else {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("No verification data available", col1X, yPos);
    }

    // --- Footer ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated by RecordSetu | Page ${i} of ${pageCount}`,
        105,
        290,
        { align: 'center' }
      );
    }

    // --- Generate filename and download ---
    const filename = `${verificationData.type.replace(/\s+/g, '_')}_${verificationData.query.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
    doc.save(filename);

    console.log('✅ PDF generated successfully:', filename);
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    throw new Error('Failed to generate PDF report');
  }
};

/**
 * Generate PDF from data grid with custom title
 */
export const generateCustomPDFReport = (
  title: string,
  data: Record<string, any>,
  metadata?: { query?: string; timestamp?: string }
): void => {
  const verificationData: VerificationData = {
    type: title,
    query: metadata?.query || 'N/A',
    timestamp: metadata?.timestamp || new Date().toISOString(),
    creditsUsed: 0,
    data: data,
  };

  generatePDFReport(verificationData);
};

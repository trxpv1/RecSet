import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import * as api from "./apiClient";

const createJsonResponse = (data: any, init?: { status?: number; ok?: boolean; contentType?: string; statusText?: string }) => {
  const status = init?.status ?? 200;
  const ok = init?.ok ?? (status >= 200 && status < 300);
  const contentType = init?.contentType ?? "application/json";

  return {
    ok,
    status,
    statusText: init?.statusText ?? (ok ? "OK" : "ERROR"),
    headers: {
      get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null),
    },
    json: vi.fn().mockResolvedValue(data),
    text: vi.fn().mockResolvedValue(typeof data === "string" ? data : JSON.stringify(data)),
  } as any;
};

describe("apiClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    const storage = new Map<string, string>();
    const localStorageMock = {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storage.set(key, value);
      }),
      removeItem: vi.fn((key: string) => {
        storage.delete(key);
      }),
      clear: vi.fn(() => storage.clear()),
    };

    Object.defineProperty(globalThis, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

    fetchMock.mockReset();
    Object.defineProperty(globalThis, "fetch", {
      value: fetchMock,
      writable: true,
      configurable: true,
    });

    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.spyOn(console, "groupCollapsed").mockImplementation(() => undefined);
    vi.spyOn(console, "groupEnd").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles token storage helpers", () => {
    expect(api.getAuthToken()).toBeNull();

    api.setAuthToken("abc123");
    expect(api.getAuthToken()).toBe("abc123");

    localStorage.setItem("user", "demo");
    api.removeAuthToken();
    expect(api.getAuthToken()).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });

  it("does not attach auth header on login/register", async () => {
    api.setAuthToken("secret-token");
    fetchMock.mockResolvedValueOnce(createJsonResponse({ token: "t", user: {}, company: {} }));

    await api.authAPI.login({ email: "a@b.com", password: "pw" });

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers.Authorization).toBeUndefined();
  });

  it("attaches auth header on protected endpoints", async () => {
    api.setAuthToken("secret-token");
    fetchMock.mockResolvedValueOnce(createJsonResponse({ success: true, data: {}, status_code: 200 }));

    await api.verifyPANComprehensive("ABCDE1234F");

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers.Authorization).toBe("Token secret-token");
  });

  const endpointCases: Array<{
    name: string;
    call: () => Promise<any>;
    expectedSuffix: string;
    method: string;
    expectedBody?: Record<string, any>;
  }> = [
    {
      name: "auth register",
      call: () => api.authAPI.register({
        company_api_key: "k",
        first_name: "A",
        last_name: "B",
        username: "ab",
        email: "ab@example.com",
        password: "P@ssw0rd!",
        password2: "P@ssw0rd!",
      }),
      expectedSuffix: "/api/register",
      method: "POST",
      expectedBody: { company_api_key: "k", username: "ab" },
    },
    {
      name: "auth login",
      call: () => api.authAPI.login({ email: "ab@example.com", password: "pw" }),
      expectedSuffix: "/api/login",
      method: "POST",
      expectedBody: { email: "ab@example.com" },
    },
    { name: "auth logout", call: () => api.authAPI.logout(), expectedSuffix: "/api/logout", method: "POST" },
    {
      name: "auth verify email",
      call: () => api.authAPI.verifyEmail("tok"),
      expectedSuffix: "/api/verify_email",
      method: "POST",
      expectedBody: { token: "tok" },
    },
    {
      name: "auth change password",
      call: () => api.authAPI.changePassword({ old_password: "a", new_password: "b", new_password2: "b" }),
      expectedSuffix: "/api/change_password",
      method: "POST",
      expectedBody: { old_password: "a" },
    },
    {
      name: "auth forgot password",
      call: () => api.authAPI.forgotPassword({ email: "ab@example.com" }),
      expectedSuffix: "/api/forgot_password",
      method: "POST",
      expectedBody: { email: "ab@example.com" },
    },
    {
      name: "auth reset password",
      call: () => api.authAPI.resetPassword({ token: "t", new_password: "b", new_password2: "b" }),
      expectedSuffix: "/api/set_new_password",
      method: "POST",
      expectedBody: { token: "t" },
    },
    {
      name: "create order",
      call: () => api.createOrder({ amount: 499, idempotency_key: "uuid-1" }),
      expectedSuffix: "/api/create_razorpay_order",
      method: "POST",
      expectedBody: { amount: 499, idempotency_key: "uuid-1" },
    },
    {
      name: "verify payment",
      call: () => api.verifyPayment({
        razorpay_payment_id: "pay_1",
        razorpay_order_id: "order_1",
        razorpay_signature: "sig",
        amount: 499,
        token: "t",
      }),
      expectedSuffix: "/api/verify_payment",
      method: "POST",
      expectedBody: { razorpay_order_id: "order_1", token: "t" },
    },
    { name: "get logs", call: () => api.getUserLogs(2, 10), expectedSuffix: "/api/logs?page=2&limit=10", method: "GET" },
    {
      name: "get transactions",
      call: () => api.getUserTransactions(3, 5, "completed"),
      expectedSuffix: "/api/get_transactions?page=3&limit=5&status=completed",
      method: "GET",
    },
    {
      name: "verify PAN comprehensive",
      call: () => api.verifyPANComprehensive("ABCDE1234F"),
      expectedSuffix: "/api/pan/pan-comprehensive",
      method: "POST",
      expectedBody: { id_number: "ABCDE1234F" },
    },
    {
      name: "verify corporate DIN",
      call: () => api.verifyCorporateDIN("1234567890"),
      expectedSuffix: "/api/corporate/din",
      method: "POST",
      expectedBody: { id_number: "1234567890" },
    },
    {
      name: "verify director phone",
      call: () => api.verifyDirectorPhone("1234567890"),
      expectedSuffix: "/api/corporate/director-phone",
      method: "POST",
      expectedBody: { id_number: "1234567890" },
    },
    {
      name: "verify GSTIN advanced",
      call: () => api.verifyGSTINAdvanced("27AAFCD5055K2Z5"),
      expectedSuffix: "/api/corporate/gstin-advanced",
      method: "POST",
      expectedBody: { id_number: "27AAFCD5055K2Z5" },
    },
    {
      name: "verify bank by mobile",
      call: () => api.verifyBankByMobile("9999999999"),
      expectedSuffix: "/api/bank-verification/bank-verification-mobile",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify RC full",
      call: () => api.verifyRCFull("DL01AB1234"),
      expectedSuffix: "/api/rc/rc-full",
      method: "POST",
      expectedBody: { id_number: "DL01AB1234" },
    },
    {
      name: "verify RC to mobile",
      call: () => api.verifyRCToMobile("DL01AB1234"),
      expectedSuffix: "/api/rc/rc-to-mobile-number",
      method: "POST",
      expectedBody: { rc_number: "DL01AB1234" },
    },
    {
      name: "verify chassis to RC (legacy)",
      call: () => api.verifyChassisToRC("MALLHA12345678901"),
      expectedSuffix: "/api/rc/chassis-to-rc",
      method: "POST",
      expectedBody: { vehicle_chasi_number: "MALLHA12345678901" },
    },
    {
      name: "verify mobile to RC",
      call: () => api.verifyMobileToRC("9999999999"),
      expectedSuffix: "/api/rc/mobile-number-to-rc",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify FASTag to RC",
      call: () => api.verifyFASTagToRC("TAG1234567890"),
      expectedSuffix: "/api/fastag/tag-to-rc",
      method: "POST",
      expectedBody: { tag_id: "TAG1234567890" },
    },
    {
      name: "verify voter ID",
      call: () => api.verifyVoterID("ABC1234567"),
      expectedSuffix: "/api/voter-id",
      method: "POST",
      expectedBody: { voter_id: "ABC1234567" },
    },
    {
      name: "verify driving license",
      call: () => api.verifyDrivingLicense("DL-0123456789012", "1990-01-01"),
      expectedSuffix: "/api/driving-license/driving-license",
      method: "POST",
      expectedBody: { id_number: "DL-0123456789012", dob: "1990-01-01" },
    },
    {
      name: "verify mobile intelligence",
      call: () => api.verifyMobileIntelligence("9999999999"),
      expectedSuffix: "/api/prefill/prefill-by-mobile",
      method: "POST",
      expectedBody: { mobile: "9999999999" },
    },
    {
      name: "verify mobile to address (legacy)",
      call: () => api.verifyMobileToAddress("9999999999"),
      expectedSuffix: "/api/mobile-to-address",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify aadhaar family members",
      call: () => api.verifyAadhaarFamilyMembers("724456746570"),
      expectedSuffix: "/api/aadhaar/family-members",
      method: "POST",
      expectedBody: { aadhaar: "724456746570" },
    },
    {
      name: "verify FamPay UPI to mobile",
      call: () => api.verifyFamPayUPIToMobile("test@fam"),
      expectedSuffix: "/api/fampay/upi-to-mobile",
      method: "POST",
      expectedBody: { fam_id: "test@fam" },
    },
    {
      name: "verify GSTIN by company name",
      call: () => api.verifyGSTINByCompanyName("ACME LTD"),
      expectedSuffix: "/api/gstin/search-by-company-name",
      method: "POST",
      expectedBody: { company_name: "ACME LTD" },
    },
    {
      name: "verify GSTIN by PAN",
      call: () => api.verifyGSTINByPAN("ABCDE1234F"),
      expectedSuffix: "/api/gstin/search-by-pan",
      method: "POST",
      expectedBody: { pan: "ABCDE1234F" },
    },
    {
      name: "verify RC to FASTag",
      call: () => api.verifyRCToFASTag("DL01AB1234"),
      expectedSuffix: "/api/fastag/rc-to-tag",
      method: "POST",
      expectedBody: { rc_number: "DL01AB1234" },
    },
    {
      name: "verify mobile to multiple UPI",
      call: () => api.verifyMobileToMultipleUPI("9999999999"),
      expectedSuffix: "/api/bank-verification/mobile-to-multiple-upi",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify chassis to RC details",
      call: () => api.verifyChassisToRCDetails("MALLHA12345678901"),
      expectedSuffix: "/api/rc/chassis-to-rc-details",
      method: "POST",
      expectedBody: { chassis_number: "MALLHA12345678901" },
    },
    {
      name: "verify voter ID text",
      call: () => api.verifyVoterIDText("ABC1234567"),
      expectedSuffix: "/api/voter-id/voter-id-info",
      method: "POST",
      expectedBody: { id_number: "ABC1234567" },
    },
    {
      name: "verify CIN to PAN",
      call: () => api.verifyCINToPAN("U72900KA2005PTC036263"),
      expectedSuffix: "/api/corporate/cin-to-pan",
      method: "POST",
      expectedBody: { cin_number: "U72900KA2005PTC036263" },
    },
    {
      name: "verify mobile to UAN",
      call: () => api.verifyMobileToUAN("9999999999"),
      expectedSuffix: "/api/income/mobile-to-uan",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify UAN to employment history",
      call: () => api.verifyUANToEmploymentHistory("123456789012"),
      expectedSuffix: "/api/income/uan-to-employment-history",
      method: "POST",
      expectedBody: { id_number: "123456789012" },
    },
    {
      name: "verify PAN to UAN",
      call: () => api.verifyPANToUAN("ABCDE1234F"),
      expectedSuffix: "/api/pan/pan-to-uan",
      method: "POST",
      expectedBody: { pan_number: "ABCDE1234F" },
    },
    {
      name: "verify RC owner history",
      call: () => api.verifyRCOwnerHistory("DL01AB1234"),
      expectedSuffix: "/api/rc/rc-owner-history",
      method: "POST",
      expectedBody: { id_number: "DL01AB1234" },
    },
    {
      name: "verify mobile to GAS",
      call: () => api.verifyMobileToGAS("9999999999", "Indane"),
      expectedSuffix: "/api/gas-connection/verify",
      method: "POST",
      expectedBody: { mobile_number: "9999999999", provider_name: "Indane" },
    },
    {
      name: "verify mobile to PAN",
      call: () => api.verifyMobileToPAN("9999999999"),
      expectedSuffix: "/api/bank-verification/mobile-to-pan",
      method: "POST",
      expectedBody: { mobile_number: "9999999999" },
    },
    {
      name: "verify UPI to bank details",
      call: () => api.verifyUPIToBankDetails("kumar32@axisb"),
      expectedSuffix: "/api/bank-verification/upi-to-bank-details",
      method: "POST",
      expectedBody: { upi_id: "kumar32@axisb" },
    },
    {
      name: "verify mobile to address enhanced",
      call: () => api.verifyMobileToAddressEnhanced("9999999999"),
      expectedSuffix: "/api/address/mobile-to-address",
      method: "POST",
      expectedBody: { mobile: "9999999999" },
    },
  ];

  for (const testCase of endpointCases) {
    it(`routes ${testCase.name} with correct endpoint/payload`, async () => {
      api.setAuthToken("token-for-tests");
      fetchMock.mockResolvedValueOnce(createJsonResponse({ success: true, data: {}, status_code: 200 }));

      await testCase.call();

      const [url, options] = fetchMock.mock.calls[0];
      expect(String(url)).toContain(testCase.expectedSuffix);
      expect(options.method).toBe(testCase.method);

      if (testCase.expectedBody) {
        const parsedBody = JSON.parse(options.body as string);
        expect(parsedBody).toMatchObject(testCase.expectedBody);
      }
    });
  }

  it("maps health API response variants", async () => {
    fetchMock.mockResolvedValueOnce(createJsonResponse({ status: "ok", message: "healthy" }));
    const ok = await api.getHealthStatus();
    expect(ok.status).toBe("ok");

    fetchMock.mockResolvedValueOnce(createJsonResponse({ status: "down", message: "all down" }));
    const down = await api.getHealthStatus();
    expect(down.status).toBe("down");

    fetchMock.mockResolvedValueOnce(createJsonResponse({ status: "partial", message: "partial", apis: ["/api/a"] }));
    const partial = await api.getHealthStatus();
    expect(partial.status).toBe("partial");
    expect(partial.apis).toEqual(["/api/a"]);
  });

  it("returns health down if health endpoint fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    const result = await api.getHealthStatus();
    expect(result.status).toBe("down");
    expect(result.apis).toEqual([]);
  });

  it("throws structured ApiClientError on non-json responses", async () => {
    api.setAuthToken("token-for-tests");
    fetchMock.mockResolvedValueOnce(createJsonResponse("<html>oops</html>", { status: 502, contentType: "text/html", ok: false }));

    await expect(api.verifyPANComprehensive("ABCDE1234F")).rejects.toMatchObject({
      endpoint: "/api/pan/pan-comprehensive",
      status: 502,
      method: "POST",
    });
  });

  it("handles non-string error payload safely", async () => {
    api.setAuthToken("token-for-tests");
    fetchMock.mockResolvedValueOnce(
      createJsonResponse({ error: { detail: "invalid payload" } }, { status: 400, ok: false, statusText: "Bad Request" }),
    );

    await expect(api.verifyPANComprehensive("ABCDE1234F")).rejects.toBeInstanceOf(Error);
  });

  it("normalizes non-object thrown fetch errors", async () => {
    api.setAuthToken("token-for-tests");
    fetchMock.mockRejectedValueOnce("catastrophic-network-failure");

    await expect(api.verifyPANComprehensive("ABCDE1234F")).rejects.toMatchObject({
      endpoint: "/api/pan/pan-comprehensive",
      method: "POST",
    });
  });

  it("maps abort errors to timeout diagnostics", async () => {
    api.setAuthToken("token-for-tests");
    fetchMock.mockRejectedValueOnce({ name: "AbortError", message: "aborted" });

    await expect(api.verifyPANComprehensive("ABCDE1234F")).rejects.toMatchObject({
      status: 504,
      endpoint: "/api/pan/pan-comprehensive",
    });
  });
});

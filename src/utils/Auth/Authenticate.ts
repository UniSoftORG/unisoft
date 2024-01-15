import { authenticate, verifyTwoFactorCode, verifyTwoFactorURLCode } from '@/core/Backend/Auth/login';
import { isGenericApiError } from '@/types/guards/api';
import { ILoginResponse } from '@/types';
import { ApiError } from '@/utils/Handlers/ApiError';

export const Authenticate = async (credentials: any, sessionId: string): Promise<ILoginResponse> => {
  const response = await AuthenticationRequest(credentials, sessionId)

  if (isGenericApiError(response)) {
    throw new Error(response.message ?? "Authentication failed!");
  } else {
    return {
      id: response.data.user.id,
      user: response.data.user,
      token: response.data.token,
      permissions: response.data.permissions,
    };
  }
}

const AuthenticationRequest = async (credentials: any, sessionId: string) => {
  const { username, password, twoFactorCode, twoFactorURLCode } =
    credentials as any;

  if (!twoFactorURLCode && (!username || !password)) {
    throw new Error("Invalid credentials");
  }

  if (!twoFactorURLCode && !twoFactorCode) {
    // Authenticate without two-factor code
    const res = await authenticate(username, password, sessionId);

    if (res.statusCode === 307) {
      throw new Error("Two-factor authentication required");
    }

    return res;
  } else if (!twoFactorURLCode && twoFactorCode) {
    // Authenticate with two-factor code
    const res = await verifyTwoFactorCode(twoFactorCode, sessionId);

    if (res.statusCode !== 200) {
      ApiError<ILoginResponse>(res);
    }
    return res;
  } else {
    const res = await verifyTwoFactorURLCode(twoFactorURLCode, sessionId);

    if (res.statusCode !== 200) {
      ApiError<ILoginResponse>(res);
    }
    return res;
  }
}
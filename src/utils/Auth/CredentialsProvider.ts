export const CredentialsProvider = ({
    username: { label: "Username", type: "text", placeholder: "Username" },
    password: { label: "Password", type: "password" },
    twoFactorCode: {
      label: "Two Factor Code",
      type: "text",
      placeholder: "Two Factor Code (Optional)",
    },
    twoFactorURLCode: {
      label: "Two URL Factor Code",
      type: "text",
      placeholder: "Two Factor Code (Optional)",
    }
})
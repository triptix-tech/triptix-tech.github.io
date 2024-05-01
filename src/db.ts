// ========
// Database
// --------
import type { Generated, Insertable, Selectable, Updateable} from 'kysely'

export interface Database {
    user: UserTable
    email_verification_token: EmailVerificationTokenTable
    password_reset_token: PasswordResetTokenTable
}

// =====
// Users
// -----
export interface UserTable {
    id: Generated<string>
    email: string
    email_verified: boolean
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

// =========================
// EMail Verification Tokens
// -------------------------
export interface EmailVerificationTokenTable {
    token: string
    expires: number
    user_id: string
}

export type EmailVerificationToken = Selectable<EmailVerificationTokenTable>
export type NewEmailVerificationToken = Insertable<EmailVerificationTokenTable>
export type EmailVerificationTokenUpdate = Updateable<EmailVerificationTokenTable>

// =====================
// Password Reset Tokens
// ---------------------
export interface PasswordResetTokenTable {
    token: string
    expires: number
    user_id: string
}

export type PasswordResetToken = Selectable<PasswordResetTokenTable>
export type NewPasswordResetToken = Insertable<PasswordResetTokenTable>
export type PasswordResetTokenUpdate = Updateable<PasswordResetTokenTable>
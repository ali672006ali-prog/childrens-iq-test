# Security Specification — Children's Intelligence Test Platform (Shared Examiners Database)

## 1. Data Invariants
1. Every document in `examinerSettings/{userId}` can only be read, created, updated, or deleted by the verified Firebase user whose `request.auth.uid == userId`.
2. Every document in `assessments/{assessmentId}` must carry an immutable `ownerId` that equals `request.auth.uid` on creation.
3. All verified examiners (`request.auth != null && request.auth.token.email_verified == true`) can `get` and `list` assessment sessions in `/assessments` where `status in ['in_progress', 'completed']` so the clinical archive is shared across all examiners.
4. All document IDs (`userId`, `assessmentId`) must match `^[a-zA-Z0-9_\-]+$` and be at most 128 characters.
5. Every string field is strictly bounded by `.size()` checks (including Base64 compressed logo data URLs <= 250,000 chars and `clinicalNotes` <= 2,000 chars).
6. Timestamps (`createdAt`, `updatedAt`) are strictly verified against `request.time`; `createdAt` and `ownerId` are immutable after creation.
7. Once an assessment reaches `status == 'completed'`, core psychometric scores (`visualRawScore`, `verbalRawScore`, `totalRawScore`, `mentalAgeMonths`, `iqScore`, `chronologicalAgeMonths`) are locked against modification; only `clinicalNotes`, `aiReport`, and `updatedAt` may be updated by verified examiners.
8. Only the creating examiner (`existing().ownerId == request.auth.uid`) or a verified admin (`isAdmin()`) may delete an assessment record or edit an `in_progress` assessment's core fields.

## 2. Adversarial "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated Read/Write**: Attempting `get`, `list`, or `create` on `assessments/session_1` with `auth == null`.
2. **Unverified Email Spoofing**: Authenticated user with `email_verified: false` reading or creating an assessment (even with admin email).
3. **Identity Spoofing on Create**: User `uidA` creating `assessments/session_2` with `ownerId: "uidB"`.
4. **Unauthorized Cross-Examiner Deletion**: User `uidB` (non-admin) attempting to `delete` `assessments/session_1` owned by `uidA`.
5. **Cross-Tenant Settings Tampering**: User `uidA` reading or updating `examinerSettings/uidB`.
6. **Shadow Field Injection**: Creating `assessments/session_3` with valid fields plus unexpected `"isAdmin": true` or `"verified": true`.
7. **ID Poisoning**: Creating `assessments/../../etc/passwd` or a 500-char invalid document ID.
8. **Resource Exhaustion (Oversized String)**: Creating `assessments/session_4` with a 50,000-character `childName` or 500KB `universityLogo`.
9. **Client Timestamp Forgery**: Creating `assessments/session_5` with client-supplied `createdAt: "2020-01-01T00:00:00Z"` instead of `request.time`.
10. **Immutable Owner Transfer**: Updating `assessments/session_1` to change `ownerId` from `uidA` to `uidB`.
11. **Terminal State Score Tampering**: Updating a `completed` assessment to alter `iqScore` from `95` to `140` or revert `status` to `in_progress`.
12. **Type Poisoning**: Updating `assessments/session_1` with `clinicalNotes: true` (boolean instead of string) or `iqScore: "high"`.

type AuditAction = 
  | 'PATIENT_CREATE'
  | 'REPORT_UPLOAD'
  | 'APPOINTMENT_MODIFY'
  | 'CONNECTION_REQUEST'
  | 'INVITE_DOCTOR'
  | 'REPORT_ANALYSIS_SUCCESS'
  | 'REPORT_ANALYSIS_FAIL';

interface AuditLog {
  action: AuditAction;
  timestamp: Date;
  user: string; // 'doctor' or 'patient'
  details: Record<string, any>;
}

export function logAuditEvent(action: AuditAction, user: 'doctor' | 'patient', details: Record<string, any> = {}) {
  const log: AuditLog = {
    action,
    timestamp: new Date(),
    user,
    details,
  };

  // In a real application, this would send the log to a dedicated logging service or database.
  // For this demo, we'll just log it to the console.
  console.log('AUDIT LOG:', JSON.stringify(log, null, 2));
}

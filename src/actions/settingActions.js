export function setSessionLength(session, minute) {
  return {
    type: 'setSession',
    session: session,
    minute: minute
  }
}

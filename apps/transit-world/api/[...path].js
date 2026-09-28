import { createVercelSharedHandler } from '../server/deployment/vercelShared.js';

// Vercel Node function; service credentials remain server environment variables.
export default createVercelSharedHandler();

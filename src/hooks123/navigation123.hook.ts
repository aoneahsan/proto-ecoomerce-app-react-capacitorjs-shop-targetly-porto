/**
 * This file contains custom hooks designed to simplify navigation within our app. The goal is to avoid scattering navigation code across different files and importing navigation hooks in many places. Instead, we consolidate these custom hooks here. This approach offers flexibility for future changes – if we need to modify or switch navigation, it can be done in one central location, streamlining maintenance.
 */

export { useNavigate as useZNavigate } from '@tanstack/react-router';

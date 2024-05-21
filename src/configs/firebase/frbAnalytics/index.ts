import { _firebaseApp } from '@/configs/firebase';
import {
  initializeAnalytics,
  isSupported,
  setAnalyticsCollectionEnabled,
  Analytics,
  logEvent
} from 'firebase/analytics';

let _frbAnalyticsInstance: Analytics | null = null;

const initializeFrbAnalytics = async () => {
  if (!_frbAnalyticsInstance) {
    if (await isSupported()) {
      _frbAnalyticsInstance = initializeAnalytics(_firebaseApp);

      setAnalyticsCollectionEnabled(_frbAnalyticsInstance, true);
    } else {
      return null;
    }
  } else {
    return _frbAnalyticsInstance;
  }
};

export const getFrbAnalyticsInstance = async () => {
  return _frbAnalyticsInstance || (await initializeFrbAnalytics());
};

export const logFrbAnalyticsEvent = async (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  const analytics = await getFrbAnalyticsInstance();

  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

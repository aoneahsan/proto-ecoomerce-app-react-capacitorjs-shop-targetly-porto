import React, { useEffect } from 'react';
import { logFrbAnalyticsEvent } from '@/configs/firebase/frbAnalytics';

const PackagesImportHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // setup Firebase Analytics Events
  useEffect(() => {
    (async () => {
      await logFrbAnalyticsEvent('page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_location: window.location.href,
        page_search: window.location.search,
        page_host: window.location.host,
        page_origin: window.location.origin,
        page_referrer: document.referrer,
        page_user_agent: navigator.userAgent,
        page_language: navigator.language,
        page_platform: navigator.platform,
        page_vendor: navigator.vendor,
        page_cookie_enabled: navigator.cookieEnabled,
        page_online: navigator.onLine,
        page_max_touch_points: navigator.maxTouchPoints,
        page_hardware_concurrency: navigator.hardwareConcurrency,
        page_app_name: navigator.appName,
        page_app_version: navigator.appVersion,
        page_app_code_name: navigator.appCodeName,
        page_product: navigator.product
      });
    })();
  }, []);

  return <>{children}</>;
};

export default PackagesImportHOC;

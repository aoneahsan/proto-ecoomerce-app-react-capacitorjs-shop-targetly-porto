// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { Helmet } from 'react-helmet';

// #endregion

// #region ---- Custom Imports ----
import constants from '@/utils/constants12';

// #endregion

// #region ---- Types Imports ----
export interface ZReactHelmetI {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  refresh?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogDescription?: string;
  ogLocale?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  shortcutIcon?: string;
  contentSecurityPolicy?: string;
  XUACompatible?: string;
  copyRight?: string;
  roboto?: string;
}
// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZReactHelmet: React.FC<ZReactHelmetI> = ({
  title = constants.helmetDefaults.title,
  description = constants.helmetDefaults.description,
  keywords = constants.helmetDefaults.keywords,
  author = constants.helmetDefaults.author,
  viewport = constants.helmetDefaults.viewport,
  ogTitle = constants.helmetDefaults.ogTitle,
  ogType = constants.helmetDefaults.ogType,
  ogUrl = constants.helmetDefaults.ogUrl,
  ogImage = constants.helmetDefaults.ogImage,
  ogDescription = constants.helmetDefaults.ogDescription,
  ogLocale = constants.helmetDefaults.ogLocale,
  ogSiteName = constants.helmetDefaults.ogSiteName,
  twitterCard = constants.helmetDefaults.twitterCard,
  twitterSite = constants.helmetDefaults.twitterSite,
  twitterCreator = constants.helmetDefaults.twitterCreator,
  twitterTitle = constants.helmetDefaults.twitterTitle,
  twitterDescription = constants.helmetDefaults.twitterDescription,
  twitterImage = constants.helmetDefaults.twitterImage,
  shortcutIcon = constants.helmetDefaults.shortcutIcon

  // do not uncomment below onces
  // refresh = constants.helmetDefaults.refresh,
  // contentSecurityPolicy = constants.helmetDefaults.contentSecurityPolicy,
  // XUACompatible = constants.helmetDefaults.XUACompatible,
  // copyRight = constants.helmetDefaults.copyRight,
  // roboto = constants.helmetDefaults.roboto,
}) => {
  return (
    <Helmet>
      {/* Common */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='author' content={author} />
      <meta name='viewport' content={viewport} />
      <meta name='og:title' content={ogTitle} />
      <meta name='og:type' content={ogType} />
      <meta name='og:url' content={ogUrl} />
      <meta name='og:image' content={ogImage} />
      <meta name='og:description' content={ogDescription} />
      <meta name='og:locale' content={ogLocale} />
      <meta name='og:site_name' content={ogSiteName} />
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:site' content={twitterSite} />
      <meta name='twitter:creator' content={twitterCreator} />
      <meta name='twitter:title' content={twitterTitle} />
      <meta name='twitter:description' content={twitterDescription} />
      <meta name='twitter:image' content={twitterImage} />
      <base href='/' />
      <link rel='shortcut icon' href={shortcutIcon} type='image/png' />
      <meta charSet='UTF-8' />
    </Helmet>
  );
};

export default ZReactHelmet;

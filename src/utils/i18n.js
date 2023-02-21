const I18n = require("telegraf-i18n");

const i18n = new I18n({
  directory: __dirname + "/locales",
  defaultLanguage: "en",
  useSession: true,
  allowMissing: false,
  fallbackToDefaultLanguage: true,
});

module.exports = i18n;

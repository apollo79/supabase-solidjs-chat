// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'de'

export type Locales =
	| 'de'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	auth: {
		signin: {
			/**
			 * Einloggen
			 */
			signin: string
			/**
			 * Einloggen...
			 */
			singingin: string
		}
		signup: {
			/**
			 * Registrieren
			 */
			signup: string
			/**
			 * Registrieren
			 */
			signingup: string
			/**
			 * Du bist jetzt registriert!
			 */
			success: string
			/**
			 * Wir haben dir eine Email zur Bestätigung deiner Identität geschickt
			 */
			checkemail: string
		}
		/**
		 * Passwort:
		 */
		password: string
		/**
		 * Passwort wiederholen:
		 */
		confirmpassword: string
		/**
		 * Email:
		 */
		email: string
		/**
		 * Nickname:
		 */
		nickname: string
	}
	error: {
		/**
		 * Ein Fehler ist aufgetreten!
		 */
		base: string
	}
	messages: {
		time: {
			/**
			 * Gerade eben
			 */
			now: string
		}
	}
}

export type TranslationFunctions = {
	auth: {
		signin: {
			/**
			 * Einloggen
			 */
			signin: () => LocalizedString
			/**
			 * Einloggen...
			 */
			singingin: () => LocalizedString
		}
		signup: {
			/**
			 * Registrieren
			 */
			signup: () => LocalizedString
			/**
			 * Registrieren
			 */
			signingup: () => LocalizedString
			/**
			 * Du bist jetzt registriert!
			 */
			success: () => LocalizedString
			/**
			 * Wir haben dir eine Email zur Bestätigung deiner Identität geschickt
			 */
			checkemail: () => LocalizedString
		}
		/**
		 * Passwort:
		 */
		password: () => LocalizedString
		/**
		 * Passwort wiederholen:
		 */
		confirmpassword: () => LocalizedString
		/**
		 * Email:
		 */
		email: () => LocalizedString
		/**
		 * Nickname:
		 */
		nickname: () => LocalizedString
	}
	error: {
		/**
		 * Ein Fehler ist aufgetreten!
		 */
		base: () => LocalizedString
	}
	messages: {
		time: {
			/**
			 * Gerade eben
			 */
			now: () => LocalizedString
		}
	}
}

export type Formatters = {}

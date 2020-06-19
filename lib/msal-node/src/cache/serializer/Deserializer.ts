/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { AccountCacheMaps, IdTokenCacheMaps, AccessTokenCacheMaps, RefreshTokenCacheMaps, AppMetadataCacheMaps } from "./JsonKeys";
import { StringUtils, AccountCache, IdTokenCache, AccessTokenCache, RefreshTokenCache, AppMetadataCache, StringDict, AccountEntity, IdTokenEntity, AccessTokenEntity, RefreshTokenEntity, AppMetadataEntity, CacheManager } from "@azure/msal-common";
import { JsonCache, InMemoryCache } from "./SerializerTypes";
import { CacheContext } from "cache/CacheContext";

// TODO: Can we write this with Generics?
export class Deserializer {

    /**
     * Parse the JSON blob in memory and deserialize the content
     * @param cachedJson
     */
    static deserializeJSONBlob(jsonFile: string): JsonCache {
        const deserializedCache = StringUtils.isEmpty(jsonFile)
            ? {}
            : JSON.parse(jsonFile);
        return deserializedCache;
    }

    /**
     * Deserializes accounts to AccountEntity objects
     * @param accounts
     */
    static deserializeAccounts(accounts: StringDict | undefined): AccountCache {
        const accountObjects: AccountCache = {};
        if (accounts) {
            Object.keys(accounts).map(function (key) {
                const mappedAcc = CacheContext.renameKeys(
                    JSON.parse(accounts[key]),
                    AccountCacheMaps.fromCacheMap
                );
                const account: AccountEntity = new AccountEntity();
                CacheManager.toObject(account, mappedAcc);
                accountObjects[key] = account;
            });
        }

        return accountObjects;
    }

    /**
     * Deserializes id tokens to IdTokenEntity objects
     * @param idTokens
     */
    static deserializeIdTokens(idTokens: StringDict | undefined): IdTokenCache {
        const idObjects: IdTokenCache = {};
        if (idTokens) {
            Object.keys(idTokens).map(function (key) {
                const mappedIdT = CacheContext.renameKeys(
                    JSON.parse(idTokens[key]),
                    IdTokenCacheMaps.fromCacheMap
                );
                const idToken: IdTokenEntity = new IdTokenEntity();
                CacheManager.toObject(idToken, mappedIdT);
                idObjects[key] = idToken;
            });
        }
        return idObjects;
    }

    /**
     * Deserializes access tokens to AccessTokenEntity objects
     * @param accessTokens
     */
    static deserializeAccessTokens(accessTokens: StringDict | undefined): AccessTokenCache {
        const atObjects: AccessTokenCache = {};
        if (accessTokens) {
            Object.keys(accessTokens).map(function (key) {
                const mappedAT = CacheContext.renameKeys(
                    JSON.parse(accessTokens[key]),
                    AccessTokenCacheMaps.fromCacheMap
                );
                const accessToken: AccessTokenEntity = new AccessTokenEntity();
                CacheManager.toObject(accessToken, mappedAT);
                atObjects[key] = accessToken;
            });
        }

        return atObjects;
    }

    /**
     * Deserializes refresh tokens to RefreshTokenEntity objects
     * @param refreshTokens
     */
    static deserializeRefreshTokens(refreshTokens: StringDict | undefined): RefreshTokenCache {
        const rtObjects: RefreshTokenCache = {};
        if (refreshTokens) {
            Object.keys(refreshTokens).map(function (key) {
                const mappedRT = CacheContext.renameKeys(
                    JSON.parse(refreshTokens[key]),
                    RefreshTokenCacheMaps.fromCacheMap
                );
                const refreshToken: RefreshTokenEntity = new RefreshTokenEntity();
                CacheManager.toObject(refreshToken, mappedRT);
                rtObjects[key] = refreshToken;
            });
        }

        return rtObjects;
    }

    /**
     * Deserializes appMetadata to AppMetaData objects
     * @param appMetadata
     */
    static deserializeAppMetadata(appMetadata: StringDict | undefined): AppMetadataCache {
        const appMetadataObjects: AppMetadataCache = {};
        if (appMetadata) {
            Object.keys(appMetadata).map(function (key) {
                const mappedAmd = CacheContext.renameKeys(
                    JSON.parse(appMetadata[key]),
                    AppMetadataCacheMaps.fromCacheMap
                );
                const amd: AppMetadataEntity = new AppMetadataEntity();
                CacheManager.toObject(amd, mappedAmd);
                appMetadataObjects[key] = amd;
            });
        }

        return appMetadataObjects;
    }

    /**
     * Deserialize an inMemory Cache
     * @param jsonCache
     */
    static deserializeAllCache(jsonCache: JsonCache): InMemoryCache {
        return {
            accounts: jsonCache.Account? this.deserializeAccounts(jsonCache.Account): {},
            idTokens: jsonCache.IdToken? this.deserializeIdTokens(jsonCache.IdToken): {},
            accessTokens: jsonCache.AccessToken? this.deserializeAccessTokens(jsonCache.AccessToken) : {},
            refreshTokens: jsonCache.RefreshToken? this.deserializeRefreshTokens(jsonCache.RefreshToken): {},
            appMetadata: jsonCache.AppMetadata? this.deserializeAppMetadata(jsonCache.AppMetadata): {}
        };
    }
}

"use strict";
exports.id = 177;
exports.ids = [177];
exports.modules = {

/***/ 75875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS: ()=>NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS,
    S3ExpressIdentityCache: ()=>S3ExpressIdentityCache,
    S3ExpressIdentityCacheEntry: ()=>S3ExpressIdentityCacheEntry,
    S3ExpressIdentityProviderImpl: ()=>S3ExpressIdentityProviderImpl,
    SignatureV4S3Express: ()=>SignatureV4S3Express,
    checkContentLengthHeader: ()=>checkContentLengthHeader,
    checkContentLengthHeaderMiddlewareOptions: ()=>checkContentLengthHeaderMiddlewareOptions,
    getCheckContentLengthHeaderPlugin: ()=>getCheckContentLengthHeaderPlugin,
    getRegionRedirectMiddlewarePlugin: ()=>getRegionRedirectMiddlewarePlugin,
    getS3ExpiresMiddlewarePlugin: ()=>getS3ExpiresMiddlewarePlugin,
    getS3ExpressPlugin: ()=>getS3ExpressPlugin,
    getThrow200ExceptionsPlugin: ()=>getThrow200ExceptionsPlugin,
    getValidateBucketNamePlugin: ()=>getValidateBucketNamePlugin,
    regionRedirectEndpointMiddleware: ()=>regionRedirectEndpointMiddleware,
    regionRedirectEndpointMiddlewareOptions: ()=>regionRedirectEndpointMiddlewareOptions,
    regionRedirectMiddleware: ()=>regionRedirectMiddleware,
    regionRedirectMiddlewareOptions: ()=>regionRedirectMiddlewareOptions,
    resolveS3Config: ()=>resolveS3Config,
    s3ExpiresMiddleware: ()=>s3ExpiresMiddleware,
    s3ExpiresMiddlewareOptions: ()=>s3ExpiresMiddlewareOptions,
    s3ExpressMiddleware: ()=>s3ExpressMiddleware,
    s3ExpressMiddlewareOptions: ()=>s3ExpressMiddlewareOptions,
    throw200ExceptionsMiddleware: ()=>throw200ExceptionsMiddleware,
    throw200ExceptionsMiddlewareOptions: ()=>throw200ExceptionsMiddlewareOptions,
    validateBucketNameMiddleware: ()=>validateBucketNameMiddleware,
    validateBucketNameMiddlewareOptions: ()=>validateBucketNameMiddlewareOptions
});
module.exports = __toCommonJS(src_exports);
// src/check-content-length-header.ts
var import_protocol_http = __webpack_require__(74720);
var import_smithy_client = __webpack_require__(5660);
var CONTENT_LENGTH_HEADER = "content-length";
function checkContentLengthHeader() {
    return (next, context)=>async (args)=>{
            var _a;
            const { request } = args;
            if (import_protocol_http.HttpRequest.isInstance(request)) {
                if (!(CONTENT_LENGTH_HEADER in request.headers)) {
                    const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
                    if (typeof ((_a = context == null ? void 0 : context.logger) == null ? void 0 : _a.warn) === "function" && !(context.logger instanceof import_smithy_client.NoOpLogger)) {
                        context.logger.warn(message);
                    } else {
                        console.warn(message);
                    }
                }
            }
            return next({
                ...args
            });
        };
}
__name(checkContentLengthHeader, "checkContentLengthHeader");
var checkContentLengthHeaderMiddlewareOptions = {
    step: "finalizeRequest",
    tags: [
        "CHECK_CONTENT_LENGTH_HEADER"
    ],
    name: "getCheckContentLengthHeaderPlugin",
    override: true
};
var getCheckContentLengthHeaderPlugin = /* @__PURE__ */ __name((unused)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
        }
    }), "getCheckContentLengthHeaderPlugin");
// src/region-redirect-endpoint-middleware.ts
var regionRedirectEndpointMiddleware = /* @__PURE__ */ __name((config)=>{
    return (next, context)=>async (args)=>{
            const originalRegion = await config.region();
            const regionProviderRef = config.region;
            if (context.__s3RegionRedirect) {
                config.region = async ()=>{
                    config.region = regionProviderRef;
                    return context.__s3RegionRedirect;
                };
            }
            const result = await next(args);
            if (context.__s3RegionRedirect) {
                const region = await config.region();
                if (originalRegion !== region) {
                    throw new Error("Region was not restored following S3 region redirect.");
                }
            }
            return result;
        };
}, "regionRedirectEndpointMiddleware");
var regionRedirectEndpointMiddlewareOptions = {
    tags: [
        "REGION_REDIRECT",
        "S3"
    ],
    name: "regionRedirectEndpointMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware"
};
// src/region-redirect-middleware.ts
function regionRedirectMiddleware(clientConfig) {
    return (next, context)=>async (args)=>{
            var _a, _b;
            try {
                return await next(args);
            } catch (err) {
                if (clientConfig.followRegionRedirects && // err.name === "PermanentRedirect" && --> removing the error name check, as that allows for HEAD operations (which have the 301 status code, but not the same error name) to be covered for region redirection as well
                ((_a = err == null ? void 0 : err.$metadata) == null ? void 0 : _a.httpStatusCode) === 301) {
                    try {
                        const actualRegion = err.$response.headers["x-amz-bucket-region"];
                        (_b = context.logger) == null ? void 0 : _b.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
                        context.__s3RegionRedirect = actualRegion;
                    } catch (e) {
                        throw new Error("Region redirect failed: " + e);
                    }
                    return next(args);
                } else {
                    throw err;
                }
            }
        };
}
__name(regionRedirectMiddleware, "regionRedirectMiddleware");
var regionRedirectMiddlewareOptions = {
    step: "initialize",
    tags: [
        "REGION_REDIRECT",
        "S3"
    ],
    name: "regionRedirectMiddleware",
    override: true
};
var getRegionRedirectMiddlewarePlugin = /* @__PURE__ */ __name((clientConfig)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
            clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
        }
    }), "getRegionRedirectMiddlewarePlugin");
// src/s3-expires-middleware.ts
var s3ExpiresMiddleware = /* @__PURE__ */ __name((config)=>{
    return (next, context)=>async (args)=>{
            var _a;
            const result = await next(args);
            const { response } = result;
            if (import_protocol_http.HttpResponse.isInstance(response)) {
                if (response.headers.expires) {
                    response.headers.expiresstring = response.headers.expires;
                    try {
                        (0, import_smithy_client.parseRfc7231DateTime)(response.headers.expires);
                    } catch (e) {
                        (_a = context.logger) == null ? void 0 : _a.warn(`AWS SDK Warning for ${context.clientName}::${context.commandName} response parsing (${response.headers.expires}): ${e}`);
                        delete response.headers.expires;
                    }
                }
            }
            return result;
        };
}, "s3ExpiresMiddleware");
var s3ExpiresMiddlewareOptions = {
    tags: [
        "S3"
    ],
    name: "s3ExpiresMiddleware",
    override: true,
    relation: "after",
    toMiddleware: "deserializerMiddleware"
};
var getS3ExpiresMiddlewarePlugin = /* @__PURE__ */ __name((clientConfig)=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo(s3ExpiresMiddleware(clientConfig), s3ExpiresMiddlewareOptions);
        }
    }), "getS3ExpiresMiddlewarePlugin");
// src/s3-express/classes/S3ExpressIdentityCache.ts
var _S3ExpressIdentityCache = class _S3ExpressIdentityCache {
    constructor(data = {}){
        this.data = data;
        this.lastPurgeTime = Date.now();
    }
    get(key) {
        const entry = this.data[key];
        if (!entry) {
            return;
        }
        return entry;
    }
    set(key, entry) {
        this.data[key] = entry;
        return entry;
    }
    delete(key) {
        delete this.data[key];
    }
    async purgeExpired() {
        const now = Date.now();
        if (this.lastPurgeTime + _S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) {
            return;
        }
        for(const key in this.data){
            const entry = this.data[key];
            if (!entry.isRefreshing) {
                const credential = await entry.identity;
                if (credential.expiration) {
                    if (credential.expiration.getTime() < now) {
                        delete this.data[key];
                    }
                }
            }
        }
    }
};
__name(_S3ExpressIdentityCache, "S3ExpressIdentityCache");
_S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 3e4;
var S3ExpressIdentityCache = _S3ExpressIdentityCache;
// src/s3-express/classes/S3ExpressIdentityCacheEntry.ts
var _S3ExpressIdentityCacheEntry = class _S3ExpressIdentityCacheEntry {
    /**
   * @param identity - stored identity.
   * @param accessed - timestamp of last access in epoch ms.
   * @param isRefreshing - this key is currently in the process of being refreshed (background).
   */ constructor(_identity, isRefreshing = false, accessed = Date.now()){
        this._identity = _identity;
        this.isRefreshing = isRefreshing;
        this.accessed = accessed;
    }
    get identity() {
        this.accessed = Date.now();
        return this._identity;
    }
};
__name(_S3ExpressIdentityCacheEntry, "S3ExpressIdentityCacheEntry");
var S3ExpressIdentityCacheEntry = _S3ExpressIdentityCacheEntry;
// src/s3-express/classes/S3ExpressIdentityProviderImpl.ts
var _S3ExpressIdentityProviderImpl = class _S3ExpressIdentityProviderImpl {
    constructor(createSessionFn, cache = new S3ExpressIdentityCache()){
        this.createSessionFn = createSessionFn;
        this.cache = cache;
    }
    async getS3ExpressIdentity(awsIdentity, identityProperties) {
        const key = identityProperties.Bucket;
        const { cache } = this;
        const entry = cache.get(key);
        if (entry) {
            return entry.identity.then((identity)=>{
                var _a, _b;
                const isExpired = (((_a = identity.expiration) == null ? void 0 : _a.getTime()) ?? 0) < Date.now();
                if (isExpired) {
                    return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
                }
                const isExpiringSoon = (((_b = identity.expiration) == null ? void 0 : _b.getTime()) ?? 0) < Date.now() + _S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS;
                if (isExpiringSoon && !entry.isRefreshing) {
                    entry.isRefreshing = true;
                    this.getIdentity(key).then((id)=>{
                        cache.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
                    });
                }
                return identity;
            });
        }
        return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
    }
    async getIdentity(key) {
        var _a, _b;
        await this.cache.purgeExpired().catch((error)=>{
            console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
        });
        const session = await this.createSessionFn(key);
        if (!((_a = session.Credentials) == null ? void 0 : _a.AccessKeyId) || !((_b = session.Credentials) == null ? void 0 : _b.SecretAccessKey)) {
            throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
        }
        const identity = {
            accessKeyId: session.Credentials.AccessKeyId,
            secretAccessKey: session.Credentials.SecretAccessKey,
            sessionToken: session.Credentials.SessionToken,
            expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : void 0
        };
        return identity;
    }
};
__name(_S3ExpressIdentityProviderImpl, "S3ExpressIdentityProviderImpl");
_S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS = 6e4;
var S3ExpressIdentityProviderImpl = _S3ExpressIdentityProviderImpl;
// src/s3-express/classes/SignatureV4S3Express.ts
var import_signature_v4 = __webpack_require__(91562);
// src/s3-express/constants.ts
var import_util_config_provider = __webpack_require__(80919);
var S3_EXPRESS_BUCKET_TYPE = "Directory";
var S3_EXPRESS_BACKEND = "S3Express";
var S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
var SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
var SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME = "AWS_S3_DISABLE_EXPRESS_SESSION_AUTH";
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME = "s3_disable_express_session_auth";
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = {
    environmentVariableSelector: (env)=>(0, import_util_config_provider.booleanSelector)(env, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME, import_util_config_provider.SelectorType.ENV),
    configFileSelector: (profile)=>(0, import_util_config_provider.booleanSelector)(profile, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME, import_util_config_provider.SelectorType.CONFIG),
    default: false
};
// src/s3-express/classes/SignatureV4S3Express.ts
var _SignatureV4S3Express = class _SignatureV4S3Express extends import_signature_v4.SignatureV4 {
    /**
   * Signs with alternate provided credentials instead of those provided in the
   * constructor.
   *
   * Additionally omits the credential sessionToken and assigns it to the
   * alternate header field for S3 Express.
   */ async signWithCredentials(requestToSign, credentials, options) {
        const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
        requestToSign.headers[SESSION_TOKEN_HEADER] = credentials.sessionToken;
        const privateAccess = this;
        setSingleOverride(privateAccess, credentialsWithoutSessionToken);
        return privateAccess.signRequest(requestToSign, options ?? {});
    }
    /**
   * Similar to {@link SignatureV4S3Express#signWithCredentials} but for presigning.
   */ async presignWithCredentials(requestToSign, credentials, options) {
        const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
        delete requestToSign.headers[SESSION_TOKEN_HEADER];
        requestToSign.headers[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
        requestToSign.query = requestToSign.query ?? {};
        requestToSign.query[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
        const privateAccess = this;
        setSingleOverride(privateAccess, credentialsWithoutSessionToken);
        return this.presign(requestToSign, options);
    }
};
__name(_SignatureV4S3Express, "SignatureV4S3Express");
var SignatureV4S3Express = _SignatureV4S3Express;
function getCredentialsWithoutSessionToken(credentials) {
    const credentialsWithoutSessionToken = {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        expiration: credentials.expiration
    };
    return credentialsWithoutSessionToken;
}
__name(getCredentialsWithoutSessionToken, "getCredentialsWithoutSessionToken");
function setSingleOverride(privateAccess, credentialsWithoutSessionToken) {
    const id = setTimeout(()=>{
        throw new Error("SignatureV4S3Express credential override was created but not called.");
    }, 10);
    const currentCredentialProvider = privateAccess.credentialProvider;
    const overrideCredentialsProviderOnce = /* @__PURE__ */ __name(()=>{
        clearTimeout(id);
        privateAccess.credentialProvider = currentCredentialProvider;
        return Promise.resolve(credentialsWithoutSessionToken);
    }, "overrideCredentialsProviderOnce");
    privateAccess.credentialProvider = overrideCredentialsProviderOnce;
}
__name(setSingleOverride, "setSingleOverride");
// src/s3-express/functions/s3ExpressMiddleware.ts
var s3ExpressMiddleware = /* @__PURE__ */ __name((options)=>{
    return (next, context)=>async (args)=>{
            var _a, _b, _c, _d, _e;
            if (context.endpointV2) {
                const endpoint = context.endpointV2;
                const isS3ExpressAuth = ((_c = (_b = (_a = endpoint.properties) == null ? void 0 : _a.authSchemes) == null ? void 0 : _b[0]) == null ? void 0 : _c.name) === S3_EXPRESS_AUTH_SCHEME;
                const isS3ExpressBucket = ((_d = endpoint.properties) == null ? void 0 : _d.backend) === S3_EXPRESS_BACKEND || ((_e = endpoint.properties) == null ? void 0 : _e.bucketType) === S3_EXPRESS_BUCKET_TYPE;
                if (isS3ExpressBucket) {
                    context.isS3ExpressBucket = true;
                }
                if (isS3ExpressAuth) {
                    const requestBucket = args.input.Bucket;
                    if (requestBucket) {
                        const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), {
                            Bucket: requestBucket
                        });
                        context.s3ExpressIdentity = s3ExpressIdentity;
                        if (import_protocol_http.HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) {
                            args.request.headers[SESSION_TOKEN_HEADER] = s3ExpressIdentity.sessionToken;
                        }
                    }
                }
            }
            return next(args);
        };
}, "s3ExpressMiddleware");
var s3ExpressMiddlewareOptions = {
    name: "s3ExpressMiddleware",
    step: "build",
    tags: [
        "S3",
        "S3_EXPRESS"
    ],
    override: true
};
var getS3ExpressPlugin = /* @__PURE__ */ __name((options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
        }
    }), "getS3ExpressPlugin");
// src/s3Configuration.ts
var resolveS3Config = /* @__PURE__ */ __name((input, { session })=>{
    const [s3ClientProvider, CreateSessionCommandCtor] = session;
    return {
        ...input,
        forcePathStyle: input.forcePathStyle ?? false,
        useAccelerateEndpoint: input.useAccelerateEndpoint ?? false,
        disableMultiregionAccessPoints: input.disableMultiregionAccessPoints ?? false,
        followRegionRedirects: input.followRegionRedirects ?? false,
        s3ExpressIdentityProvider: input.s3ExpressIdentityProvider ?? new S3ExpressIdentityProviderImpl(async (key)=>s3ClientProvider().send(new CreateSessionCommandCtor({
                Bucket: key,
                SessionMode: "ReadWrite"
            }))),
        bucketEndpoint: input.bucketEndpoint ?? false
    };
}, "resolveS3Config");
// src/throw-200-exceptions.ts
var throw200ExceptionsMiddleware = /* @__PURE__ */ __name((config)=>(next)=>async (args)=>{
            const result = await next(args);
            const { response } = result;
            if (!import_protocol_http.HttpResponse.isInstance(response)) return result;
            const { statusCode, body } = response;
            if (statusCode < 200 || statusCode >= 300) return result;
            const bodyBytes = await collectBody(body, config);
            const bodyString = await collectBodyString(bodyBytes, config);
            if (bodyBytes.length === 0) {
                const err = new Error("S3 aborted request");
                err.name = "InternalError";
                throw err;
            }
            if (bodyString && bodyString.match("<Error>")) {
                response.statusCode = 400;
            }
            response.body = bodyBytes;
            return result;
        }, "throw200ExceptionsMiddleware");
var collectBody = /* @__PURE__ */ __name((streamBody = new Uint8Array(), context)=>{
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
}, "collectBody");
var collectBodyString = /* @__PURE__ */ __name((streamBody, context)=>collectBody(streamBody, context).then((body)=>context.utf8Encoder(body)), "collectBodyString");
var throw200ExceptionsMiddlewareOptions = {
    relation: "after",
    toMiddleware: "deserializerMiddleware",
    tags: [
        "THROW_200_EXCEPTIONS",
        "S3"
    ],
    name: "throw200ExceptionsMiddleware",
    override: true
};
var getThrow200ExceptionsPlugin = /* @__PURE__ */ __name((config)=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
        }
    }), "getThrow200ExceptionsPlugin");
// src/validate-bucket-name.ts
var import_util_arn_parser = __webpack_require__(62382);
// src/bucket-endpoint-middleware.ts
function bucketEndpointMiddleware(options) {
    return (next, context)=>async (args)=>{
            var _a, _b, _c, _d;
            if (options.bucketEndpoint) {
                const endpoint = context.endpointV2;
                if (endpoint) {
                    const bucket = args.input.Bucket;
                    if (typeof bucket === "string") {
                        try {
                            const bucketEndpointUrl = new URL(bucket);
                            endpoint.url = bucketEndpointUrl;
                        } catch (e) {
                            const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
                            if (((_b = (_a = context.logger) == null ? void 0 : _a.constructor) == null ? void 0 : _b.name) === "NoOpLogger") {
                                console.warn(warning);
                            } else {
                                (_d = (_c = context.logger) == null ? void 0 : _c.warn) == null ? void 0 : _d.call(_c, warning);
                            }
                            throw e;
                        }
                    }
                }
            }
            return next(args);
        };
}
__name(bucketEndpointMiddleware, "bucketEndpointMiddleware");
var bucketEndpointMiddlewareOptions = {
    name: "bucketEndpointMiddleware",
    override: true,
    relation: "after",
    toMiddleware: "endpointV2Middleware"
};
// src/validate-bucket-name.ts
function validateBucketNameMiddleware({ bucketEndpoint }) {
    return (next)=>async (args)=>{
            const { input: { Bucket } } = args;
            if (!bucketEndpoint && typeof Bucket === "string" && !(0, import_util_arn_parser.validate)(Bucket) && Bucket.indexOf("/") >= 0) {
                const err = new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
                err.name = "InvalidBucketName";
                throw err;
            }
            return next({
                ...args
            });
        };
}
__name(validateBucketNameMiddleware, "validateBucketNameMiddleware");
var validateBucketNameMiddlewareOptions = {
    step: "initialize",
    tags: [
        "VALIDATE_BUCKET_NAME"
    ],
    name: "validateBucketNameMiddleware",
    override: true
};
var getValidateBucketNamePlugin = /* @__PURE__ */ __name((options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
            clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
        }
    }), "getValidateBucketNamePlugin");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 86889:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    S3RequestPresigner: ()=>S3RequestPresigner,
    getSignedUrl: ()=>getSignedUrl
});
module.exports = __toCommonJS(src_exports);
// src/getSignedUrl.ts
var import_util_format_url = __webpack_require__(6211);
var import_middleware_endpoint = __webpack_require__(90583);
var import_protocol_http = __webpack_require__(74720);
// src/presigner.ts
var import_signature_v4_multi_region = __webpack_require__(38392);
// src/constants.ts
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var SHA256_HEADER = "X-Amz-Content-Sha256";
// src/presigner.ts
var _S3RequestPresigner = class _S3RequestPresigner {
    constructor(options){
        const resolvedOptions = {
            // Allow `signingName` because we want to support usecase of supply client's resolved config
            // directly. Where service equals signingName.
            service: options.signingName || options.service || "s3",
            uriEscapePath: options.uriEscapePath || false,
            applyChecksum: options.applyChecksum || false,
            ...options
        };
        this.signer = new import_signature_v4_multi_region.SignatureV4MultiRegion(resolvedOptions);
    }
    presign(requestToSign, { unsignableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set(), ...options } = {}) {
        this.prepareRequest(requestToSign, {
            unsignableHeaders,
            unhoistableHeaders
        });
        return this.signer.presign(requestToSign, {
            expiresIn: 900,
            unsignableHeaders,
            unhoistableHeaders,
            ...options
        });
    }
    presignWithCredentials(requestToSign, credentials, { unsignableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set(), ...options } = {}) {
        this.prepareRequest(requestToSign, {
            unsignableHeaders,
            unhoistableHeaders
        });
        return this.signer.presignWithCredentials(requestToSign, credentials, {
            expiresIn: 900,
            unsignableHeaders,
            unhoistableHeaders,
            ...options
        });
    }
    prepareRequest(requestToSign, { unsignableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set() } = {}) {
        unsignableHeaders.add("content-type");
        Object.keys(requestToSign.headers).map((header)=>header.toLowerCase()).filter((header)=>header.startsWith("x-amz-server-side-encryption")).forEach((header)=>{
            unhoistableHeaders.add(header);
        });
        requestToSign.headers[SHA256_HEADER] = UNSIGNED_PAYLOAD;
        const currentHostHeader = requestToSign.headers.host;
        const port = requestToSign.port;
        const expectedHostHeader = `${requestToSign.hostname}${requestToSign.port != null ? ":" + port : ""}`;
        if (!currentHostHeader || currentHostHeader === requestToSign.hostname && requestToSign.port != null) {
            requestToSign.headers.host = expectedHostHeader;
        }
    }
};
__name(_S3RequestPresigner, "S3RequestPresigner");
var S3RequestPresigner = _S3RequestPresigner;
// src/getSignedUrl.ts
var getSignedUrl = /* @__PURE__ */ __name(async (client, command, options = {})=>{
    var _a, _b, _c;
    let s3Presigner;
    let region;
    if (typeof client.config.endpointProvider === "function") {
        const endpointV2 = await (0, import_middleware_endpoint.getEndpointFromInstructions)(command.input, command.constructor, client.config);
        const authScheme = (_b = (_a = endpointV2.properties) == null ? void 0 : _a.authSchemes) == null ? void 0 : _b[0];
        if ((authScheme == null ? void 0 : authScheme.name) === "sigv4a") {
            region = (_c = authScheme == null ? void 0 : authScheme.signingRegionSet) == null ? void 0 : _c.join(",");
        } else {
            region = authScheme == null ? void 0 : authScheme.signingRegion;
        }
        s3Presigner = new S3RequestPresigner({
            ...client.config,
            signingName: authScheme == null ? void 0 : authScheme.signingName,
            region: async ()=>region
        });
    } else {
        s3Presigner = new S3RequestPresigner(client.config);
    }
    const presignInterceptMiddleware = /* @__PURE__ */ __name((next, context)=>async (args)=>{
            const { request } = args;
            if (!import_protocol_http.HttpRequest.isInstance(request)) {
                throw new Error("Request to be presigned is not an valid HTTP request.");
            }
            delete request.headers["amz-sdk-invocation-id"];
            delete request.headers["amz-sdk-request"];
            delete request.headers["x-amz-user-agent"];
            let presigned2;
            const presignerOptions = {
                ...options,
                signingRegion: options.signingRegion ?? context["signing_region"] ?? region,
                signingService: options.signingService ?? context["signing_service"]
            };
            if (context.s3ExpressIdentity) {
                presigned2 = await s3Presigner.presignWithCredentials(request, context.s3ExpressIdentity, presignerOptions);
            } else {
                presigned2 = await s3Presigner.presign(request, presignerOptions);
            }
            return {
                // Intercept the middleware stack by returning fake response
                response: {},
                output: {
                    $metadata: {
                        httpStatusCode: 200
                    },
                    presigned: presigned2
                }
            };
        }, "presignInterceptMiddleware");
    const middlewareName = "presignInterceptMiddleware";
    const clientStack = client.middlewareStack.clone();
    clientStack.addRelativeTo(presignInterceptMiddleware, {
        name: middlewareName,
        relation: "before",
        toMiddleware: "awsAuthMiddleware",
        override: true
    });
    const handler = command.resolveMiddleware(clientStack, client.config, {});
    const { output } = await handler({
        input: command.input
    });
    const { presigned } = output;
    return (0, import_util_format_url.formatUrl)(presigned);
}, "getSignedUrl");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 38392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    SignatureV4MultiRegion: ()=>SignatureV4MultiRegion,
    signatureV4CrtContainer: ()=>signatureV4CrtContainer
});
module.exports = __toCommonJS(src_exports);
// src/SignatureV4MultiRegion.ts
var import_middleware_sdk_s3 = __webpack_require__(75875);
// src/signature-v4-crt-container.ts
var signatureV4CrtContainer = {
    CrtSignerV4: null
};
// src/SignatureV4MultiRegion.ts
var _SignatureV4MultiRegion = class _SignatureV4MultiRegion {
    constructor(options){
        this.sigv4Signer = new import_middleware_sdk_s3.SignatureV4S3Express(options);
        this.signerOptions = options;
    }
    async sign(requestToSign, options = {}) {
        if (options.signingRegion === "*") {
            if (this.signerOptions.runtime !== "node") throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
            return this.getSigv4aSigner().sign(requestToSign, options);
        }
        return this.sigv4Signer.sign(requestToSign, options);
    }
    /**
   * Sign with alternate credentials to the ones provided in the constructor.
   */ async signWithCredentials(requestToSign, credentials, options = {}) {
        if (options.signingRegion === "*") {
            if (this.signerOptions.runtime !== "node") throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
            return this.getSigv4aSigner().signWithCredentials(requestToSign, credentials, options);
        }
        return this.sigv4Signer.signWithCredentials(requestToSign, credentials, options);
    }
    async presign(originalRequest, options = {}) {
        if (options.signingRegion === "*") {
            if (this.signerOptions.runtime !== "node") throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
            return this.getSigv4aSigner().presign(originalRequest, options);
        }
        return this.sigv4Signer.presign(originalRequest, options);
    }
    async presignWithCredentials(originalRequest, credentials, options = {}) {
        if (options.signingRegion === "*") {
            throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
        }
        return this.sigv4Signer.presignWithCredentials(originalRequest, credentials, options);
    }
    getSigv4aSigner() {
        if (!this.sigv4aSigner) {
            let CrtSignerV4 = null;
            try {
                CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
                if (typeof CrtSignerV4 !== "function") throw new Error();
            } catch (e) {
                e.message = `${e.message}
Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. 
You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. 
For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`;
                throw e;
            }
            this.sigv4aSigner = new CrtSignerV4({
                ...this.signerOptions,
                signingAlgorithm: 1
            });
        }
        return this.sigv4aSigner;
    }
};
__name(_SignatureV4MultiRegion, "SignatureV4MultiRegion");
var SignatureV4MultiRegion = _SignatureV4MultiRegion;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 62382:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    build: ()=>build,
    parse: ()=>parse,
    validate: ()=>validate
});
module.exports = __toCommonJS(src_exports);
var validate = /* @__PURE__ */ __name((str)=>typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6, "validate");
var parse = /* @__PURE__ */ __name((arn)=>{
    const segments = arn.split(":");
    if (segments.length < 6 || segments[0] !== "arn") throw new Error("Malformed ARN");
    const [, //Skip "arn" literal
    partition, service, region, accountId, ...resource] = segments;
    return {
        partition,
        service,
        region,
        accountId,
        resource: resource.join(":")
    };
}, "parse");
var build = /* @__PURE__ */ __name((arnObject)=>{
    const { partition = "aws", service, region, accountId, resource } = arnObject;
    if ([
        service,
        region,
        accountId,
        resource
    ].some((segment)=>typeof segment !== "string")) {
        throw new Error("Input ARN object is invalid");
    }
    return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;
}, "build");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 6211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    formatUrl: ()=>formatUrl
});
module.exports = __toCommonJS(src_exports);
var import_querystring_builder = __webpack_require__(76176);
function formatUrl(request) {
    const { port, query } = request;
    let { protocol, path, hostname } = request;
    if (protocol && protocol.slice(-1) !== ":") {
        protocol += ":";
    }
    if (port) {
        hostname += `:${port}`;
    }
    if (path && path.charAt(0) !== "/") {
        path = `/${path}`;
    }
    let queryString = query ? (0, import_querystring_builder.buildQueryString)(query) : "";
    if (queryString && queryString[0] !== "?") {
        queryString = `?${queryString}`;
    }
    let auth = "";
    if (request.username != null || request.password != null) {
        const username = request.username ?? "";
        const password = request.password ?? "";
        auth = `${username}:${password}@`;
    }
    let fragment = "";
    if (request.fragment) {
        fragment = `#${request.fragment}`;
    }
    return `${protocol}//${auth}${hostname}${path}${queryString}${fragment}`;
}
__name(formatUrl, "formatUrl");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 45220:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    isArrayBuffer: ()=>isArrayBuffer
});
module.exports = __toCommonJS(src_exports);
var isArrayBuffer = /* @__PURE__ */ __name((arg)=>typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]", "isArrayBuffer");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 8807:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getEndpointFromConfig = void 0;
const node_config_provider_1 = __webpack_require__(52979);
const getEndpointUrlConfig_1 = __webpack_require__(41508);
const getEndpointFromConfig = async (serviceId)=>(0, node_config_provider_1.loadConfig)((0, getEndpointUrlConfig_1.getEndpointUrlConfig)(serviceId))();
exports.getEndpointFromConfig = getEndpointFromConfig;


/***/ }),

/***/ 41508:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getEndpointUrlConfig = void 0;
const shared_ini_file_loader_1 = __webpack_require__(53595);
const ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
const CONFIG_ENDPOINT_URL = "endpoint_url";
const getEndpointUrlConfig = (serviceId)=>({
        environmentVariableSelector: (env)=>{
            const serviceSuffixParts = serviceId.split(" ").map((w)=>w.toUpperCase());
            const serviceEndpointUrl = env[[
                ENV_ENDPOINT_URL,
                ...serviceSuffixParts
            ].join("_")];
            if (serviceEndpointUrl) return serviceEndpointUrl;
            const endpointUrl = env[ENV_ENDPOINT_URL];
            if (endpointUrl) return endpointUrl;
            return undefined;
        },
        configFileSelector: (profile, config)=>{
            if (config && profile.services) {
                const servicesSection = config[[
                    "services",
                    profile.services
                ].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
                if (servicesSection) {
                    const servicePrefixParts = serviceId.split(" ").map((w)=>w.toLowerCase());
                    const endpointUrl = servicesSection[[
                        servicePrefixParts.join("_"),
                        CONFIG_ENDPOINT_URL
                    ].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
                    if (endpointUrl) return endpointUrl;
                }
            }
            const endpointUrl = profile[CONFIG_ENDPOINT_URL];
            if (endpointUrl) return endpointUrl;
            return undefined;
        },
        default: undefined
    });
exports.getEndpointUrlConfig = getEndpointUrlConfig;


/***/ }),

/***/ 90583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    endpointMiddleware: ()=>endpointMiddleware,
    endpointMiddlewareOptions: ()=>endpointMiddlewareOptions,
    getEndpointFromInstructions: ()=>getEndpointFromInstructions,
    getEndpointPlugin: ()=>getEndpointPlugin,
    resolveEndpointConfig: ()=>resolveEndpointConfig,
    resolveParams: ()=>resolveParams,
    toEndpointV1: ()=>toEndpointV1
});
module.exports = __toCommonJS(src_exports);
// src/service-customizations/s3.ts
var resolveParamsForS3 = /* @__PURE__ */ __name(async (endpointParams)=>{
    const bucket = (endpointParams == null ? void 0 : endpointParams.Bucket) || "";
    if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
    }
    if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
            throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
    } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
    }
    if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
    }
    return endpointParams;
}, "resolveParamsForS3");
var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
var DOTS_PATTERN = /\.\./;
var isDnsCompatibleBucketName = /* @__PURE__ */ __name((bucketName)=>DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName), "isDnsCompatibleBucketName");
var isArnBucketName = /* @__PURE__ */ __name((bucketName)=>{
    const [arn, partition, service, , , bucket] = bucketName.split(":");
    const isArn = arn === "arn" && bucketName.split(":").length >= 6;
    const isValidArn = Boolean(isArn && partition && service && bucket);
    if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
    }
    return isValidArn;
}, "isArnBucketName");
// src/adaptors/createConfigValueProvider.ts
var createConfigValueProvider = /* @__PURE__ */ __name((configKey, canonicalEndpointParamKey, config)=>{
    const configProvider = /* @__PURE__ */ __name(async ()=>{
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
            return configValue();
        }
        return configValue;
    }, "configProvider");
    if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async ()=>{
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = (credentials == null ? void 0 : credentials.credentialScope) ?? (credentials == null ? void 0 : credentials.CredentialScope);
            return configValue;
        };
    }
    if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async ()=>{
            const endpoint = await configProvider();
            if (endpoint && typeof endpoint === "object") {
                if ("url" in endpoint) {
                    return endpoint.url.href;
                }
                if ("hostname" in endpoint) {
                    const { protocol, hostname, port, path } = endpoint;
                    return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
                }
            }
            return endpoint;
        };
    }
    return configProvider;
}, "createConfigValueProvider");
// src/adaptors/getEndpointFromInstructions.ts
var import_getEndpointFromConfig = __webpack_require__(8807);
// src/adaptors/toEndpointV1.ts
var import_url_parser = __webpack_require__(95969);
var toEndpointV1 = /* @__PURE__ */ __name((endpoint)=>{
    if (typeof endpoint === "object") {
        if ("url" in endpoint) {
            return (0, import_url_parser.parseUrl)(endpoint.url);
        }
        return endpoint;
    }
    return (0, import_url_parser.parseUrl)(endpoint);
}, "toEndpointV1");
// src/adaptors/getEndpointFromInstructions.ts
var getEndpointFromInstructions = /* @__PURE__ */ __name(async (commandInput, instructionsSupplier, clientConfig, context)=>{
    if (!clientConfig.endpoint) {
        const endpointFromConfig = await (0, import_getEndpointFromConfig.getEndpointFromConfig)(clientConfig.serviceId || "");
        if (endpointFromConfig) {
            clientConfig.endpoint = ()=>Promise.resolve(toEndpointV1(endpointFromConfig));
        }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    return endpoint;
}, "getEndpointFromInstructions");
var resolveParams = /* @__PURE__ */ __name(async (commandInput, instructionsSupplier, clientConfig)=>{
    var _a;
    const endpointParams = {};
    const instructions = ((_a = instructionsSupplier == null ? void 0 : instructionsSupplier.getEndpointParameterInstructions) == null ? void 0 : _a.call(instructionsSupplier)) || {};
    for (const [name, instruction] of Object.entries(instructions)){
        switch(instruction.type){
            case "staticContextParams":
                endpointParams[name] = instruction.value;
                break;
            case "contextParams":
                endpointParams[name] = commandInput[instruction.name];
                break;
            case "clientContextParams":
            case "builtInParams":
                endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig)();
                break;
            default:
                throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
    }
    if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
    }
    if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
    }
    return endpointParams;
}, "resolveParams");
// src/endpointMiddleware.ts
var import_util_middleware = __webpack_require__(20362);
var endpointMiddleware = /* @__PURE__ */ __name(({ config, instructions })=>{
    return (next, context)=>async (args)=>{
            var _a, _b, _c;
            const endpoint = await getEndpointFromInstructions(args.input, {
                getEndpointParameterInstructions () {
                    return instructions;
                }
            }, {
                ...config
            }, context);
            context.endpointV2 = endpoint;
            context.authSchemes = (_a = endpoint.properties) == null ? void 0 : _a.authSchemes;
            const authScheme = (_b = context.authSchemes) == null ? void 0 : _b[0];
            if (authScheme) {
                context["signing_region"] = authScheme.signingRegion;
                context["signing_service"] = authScheme.signingName;
                const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
                const httpAuthOption = (_c = smithyContext == null ? void 0 : smithyContext.selectedHttpAuthScheme) == null ? void 0 : _c.httpAuthOption;
                if (httpAuthOption) {
                    httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
                        signing_region: authScheme.signingRegion,
                        signingRegion: authScheme.signingRegion,
                        signing_service: authScheme.signingName,
                        signingName: authScheme.signingName,
                        signingRegionSet: authScheme.signingRegionSet
                    }, authScheme.properties);
                }
            }
            return next({
                ...args
            });
        };
}, "endpointMiddleware");
// src/getEndpointPlugin.ts
var import_middleware_serde = __webpack_require__(53926);
var endpointMiddlewareOptions = {
    step: "serialize",
    tags: [
        "ENDPOINT_PARAMETERS",
        "ENDPOINT_V2",
        "ENDPOINT"
    ],
    name: "endpointV2Middleware",
    override: true,
    relation: "before",
    toMiddleware: import_middleware_serde.serializerMiddlewareOption.name
};
var getEndpointPlugin = /* @__PURE__ */ __name((config, instructions)=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo(endpointMiddleware({
                config,
                instructions
            }), endpointMiddlewareOptions);
        }
    }), "getEndpointPlugin");
// src/resolveEndpointConfig.ts
var resolveEndpointConfig = /* @__PURE__ */ __name((input)=>{
    const tls = input.tls ?? true;
    const { endpoint } = input;
    const customEndpointProvider = endpoint != null ? async ()=>toEndpointV1(await (0, import_util_middleware.normalizeProvider)(endpoint)()) : void 0;
    const isCustomEndpoint = !!endpoint;
    return {
        ...input,
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: (0, import_util_middleware.normalizeProvider)(input.useDualstackEndpoint ?? false),
        useFipsEndpoint: (0, import_util_middleware.normalizeProvider)(input.useFipsEndpoint ?? false)
    };
}, "resolveEndpointConfig");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 53926:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    deserializerMiddleware: ()=>deserializerMiddleware,
    deserializerMiddlewareOption: ()=>deserializerMiddlewareOption,
    getSerdePlugin: ()=>getSerdePlugin,
    serializerMiddleware: ()=>serializerMiddleware,
    serializerMiddlewareOption: ()=>serializerMiddlewareOption
});
module.exports = __toCommonJS(src_exports);
// src/deserializerMiddleware.ts
var deserializerMiddleware = /* @__PURE__ */ __name((options, deserializer)=>(next, context)=>async (args)=>{
            const { response } = await next(args);
            try {
                const parsed = await deserializer(response, options);
                return {
                    response,
                    output: parsed
                };
            } catch (error) {
                Object.defineProperty(error, "$response", {
                    value: response
                });
                if (!("$metadata" in error)) {
                    const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
                    error.message += "\n  " + hint;
                    if (typeof error.$responseBodyText !== "undefined") {
                        if (error.$response) {
                            error.$response.body = error.$responseBodyText;
                        }
                    }
                }
                throw error;
            }
        }, "deserializerMiddleware");
// src/serializerMiddleware.ts
var serializerMiddleware = /* @__PURE__ */ __name((options, serializer)=>(next, context)=>async (args)=>{
            var _a;
            const endpoint = ((_a = context.endpointV2) == null ? void 0 : _a.url) && options.urlParser ? async ()=>options.urlParser(context.endpointV2.url) : options.endpoint;
            if (!endpoint) {
                throw new Error("No valid endpoint provider available.");
            }
            const request = await serializer(args.input, {
                ...options,
                endpoint
            });
            return next({
                ...args,
                request
            });
        }, "serializerMiddleware");
// src/serdePlugin.ts
var deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: [
        "DESERIALIZER"
    ],
    override: true
};
var serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: [
        "SERIALIZER"
    ],
    override: true
};
function getSerdePlugin(config, serializer, deserializer) {
    return {
        applyToStack: (commandStack)=>{
            commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
            commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
        }
    };
}
__name(getSerdePlugin, "getSerdePlugin");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 23073:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    constructStack: ()=>constructStack
});
module.exports = __toCommonJS(src_exports);
// src/MiddlewareStack.ts
var getAllAliases = /* @__PURE__ */ __name((name, aliases)=>{
    const _aliases = [];
    if (name) {
        _aliases.push(name);
    }
    if (aliases) {
        for (const alias of aliases){
            _aliases.push(alias);
        }
    }
    return _aliases;
}, "getAllAliases");
var getMiddlewareNameWithAliases = /* @__PURE__ */ __name((name, aliases)=>{
    return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
}, "getMiddlewareNameWithAliases");
var constructStack = /* @__PURE__ */ __name(()=>{
    let absoluteEntries = [];
    let relativeEntries = [];
    let identifyOnResolve = false;
    const entriesNameSet = /* @__PURE__ */ new Set();
    const sort = /* @__PURE__ */ __name((entries)=>entries.sort((a, b)=>stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]), "sort");
    const removeByName = /* @__PURE__ */ __name((toRemove)=>{
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name((entry)=>{
            const aliases = getAllAliases(entry.name, entry.aliases);
            if (aliases.includes(toRemove)) {
                isRemoved = true;
                for (const alias of aliases){
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    }, "removeByName");
    const removeByReference = /* @__PURE__ */ __name((toRemove)=>{
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name((entry)=>{
            if (entry.middleware === toRemove) {
                isRemoved = true;
                for (const alias of getAllAliases(entry.name, entry.aliases)){
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    }, "removeByReference");
    const cloneTo = /* @__PURE__ */ __name((toStack)=>{
        var _a;
        absoluteEntries.forEach((entry)=>{
            toStack.add(entry.middleware, {
                ...entry
            });
        });
        relativeEntries.forEach((entry)=>{
            toStack.addRelativeTo(entry.middleware, {
                ...entry
            });
        });
        (_a = toStack.identifyOnResolve) == null ? void 0 : _a.call(toStack, stack.identifyOnResolve());
        return toStack;
    }, "cloneTo");
    const expandRelativeMiddlewareList = /* @__PURE__ */ __name((from)=>{
        const expandedMiddlewareList = [];
        from.before.forEach((entry)=>{
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            } else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry)=>{
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            } else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        return expandedMiddlewareList;
    }, "expandRelativeMiddlewareList");
    const getMiddlewareList = /* @__PURE__ */ __name((debug = false)=>{
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry)=>{
            const normalizedEntry = {
                ...entry,
                before: [],
                after: []
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)){
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry)=>{
            const normalizedEntry = {
                ...entry,
                before: [],
                after: []
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)){
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry)=>{
            if (entry.toMiddleware) {
                const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === void 0) {
                    if (debug) {
                        return;
                    }
                    throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList)=>{
            wholeList.push(...expandedMiddlewareList);
            return wholeList;
        }, []);
        return mainChain;
    }, "getMiddlewareList");
    const stack = {
        add: (middleware, options = {})=>{
            const { name, override, aliases: _aliases } = options;
            const entry = {
                step: "initialize",
                priority: "normal",
                middleware,
                ...options
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias)=>entriesNameSet.has(alias))) {
                    if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases){
                        const toOverrideIndex = absoluteEntries.findIndex((entry2)=>{
                            var _a;
                            return entry2.name === alias || ((_a = entry2.aliases) == null ? void 0 : _a.some((a)=>a === alias));
                        });
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = absoluteEntries[toOverrideIndex];
                        if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
                        }
                        absoluteEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases){
                    entriesNameSet.add(alias);
                }
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options)=>{
            const { name, override, aliases: _aliases } = options;
            const entry = {
                middleware,
                ...options
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias)=>entriesNameSet.has(alias))) {
                    if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases){
                        const toOverrideIndex = relativeEntries.findIndex((entry2)=>{
                            var _a;
                            return entry2.name === alias || ((_a = entry2.aliases) == null ? void 0 : _a.some((a)=>a === alias));
                        });
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = relativeEntries[toOverrideIndex];
                        if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
                        }
                        relativeEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases){
                    entriesNameSet.add(alias);
                }
            }
            relativeEntries.push(entry);
        },
        clone: ()=>cloneTo(constructStack()),
        use: (plugin)=>{
            plugin.applyToStack(stack);
        },
        remove: (toRemove)=>{
            if (typeof toRemove === "string") return removeByName(toRemove);
            else return removeByReference(toRemove);
        },
        removeByTag: (toRemove)=>{
            let isRemoved = false;
            const filterCb = /* @__PURE__ */ __name((entry)=>{
                const { tags, name, aliases: _aliases } = entry;
                if (tags && tags.includes(toRemove)) {
                    const aliases = getAllAliases(name, _aliases);
                    for (const alias of aliases){
                        entriesNameSet.delete(alias);
                    }
                    isRemoved = true;
                    return false;
                }
                return true;
            }, "filterCb");
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: (from)=>{
            var _a;
            const cloned = cloneTo(constructStack());
            cloned.use(from);
            cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (((_a = from.identifyOnResolve) == null ? void 0 : _a.call(from)) ?? false));
            return cloned;
        },
        applyToStack: cloneTo,
        identify: ()=>{
            return getMiddlewareList(true).map((mw)=>{
                const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
                return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
            });
        },
        identifyOnResolve (toggle) {
            if (typeof toggle === "boolean") identifyOnResolve = toggle;
            return identifyOnResolve;
        },
        resolve: (handler, context)=>{
            for (const middleware of getMiddlewareList().map((entry)=>entry.middleware).reverse()){
                handler = middleware(handler, context);
            }
            if (identifyOnResolve) {
                console.log(stack.identify());
            }
            return handler;
        }
    };
    return stack;
}, "constructStack");
var stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1
};
var priorityWeights = {
    high: 3,
    normal: 2,
    low: 1
};
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 52979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    loadConfig: ()=>loadConfig
});
module.exports = __toCommonJS(src_exports);
// src/configLoader.ts
// src/fromEnv.ts
var import_property_provider = __webpack_require__(79743);
var fromEnv = /* @__PURE__ */ __name((envVarSelector)=>async ()=>{
        try {
            const config = envVarSelector(process.env);
            if (config === void 0) {
                throw new Error();
            }
            return config;
        } catch (e) {
            throw new import_property_provider.CredentialsProviderError(e.message || `Cannot load config from environment variables with getter: ${envVarSelector}`);
        }
    }, "fromEnv");
// src/fromSharedConfigFiles.ts
var import_shared_ini_file_loader = __webpack_require__(53595);
var fromSharedConfigFiles = /* @__PURE__ */ __name((configSelector, { preferredFile = "config", ...init } = {})=>async ()=>{
        const profile = (0, import_shared_ini_file_loader.getProfileName)(init);
        const { configFile, credentialsFile } = await (0, import_shared_ini_file_loader.loadSharedConfigFiles)(init);
        const profileFromCredentials = credentialsFile[profile] || {};
        const profileFromConfig = configFile[profile] || {};
        const mergedProfile = preferredFile === "config" ? {
            ...profileFromCredentials,
            ...profileFromConfig
        } : {
            ...profileFromConfig,
            ...profileFromCredentials
        };
        try {
            const cfgFile = preferredFile === "config" ? configFile : credentialsFile;
            const configValue = configSelector(mergedProfile, cfgFile);
            if (configValue === void 0) {
                throw new Error();
            }
            return configValue;
        } catch (e) {
            throw new import_property_provider.CredentialsProviderError(e.message || `Cannot load config for profile ${profile} in SDK configuration files with getter: ${configSelector}`);
        }
    }, "fromSharedConfigFiles");
// src/fromStatic.ts
var isFunction = /* @__PURE__ */ __name((func)=>typeof func === "function", "isFunction");
var fromStatic = /* @__PURE__ */ __name((defaultValue)=>isFunction(defaultValue) ? async ()=>await defaultValue() : (0, import_property_provider.fromStatic)(defaultValue), "fromStatic");
// src/configLoader.ts
var loadConfig = /* @__PURE__ */ __name(({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {})=>(0, import_property_provider.memoize)((0, import_property_provider.chain)(fromEnv(environmentVariableSelector), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue))), "loadConfig");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 35985:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    DEFAULT_REQUEST_TIMEOUT: ()=>DEFAULT_REQUEST_TIMEOUT,
    NodeHttp2Handler: ()=>NodeHttp2Handler,
    NodeHttpHandler: ()=>NodeHttpHandler,
    streamCollector: ()=>streamCollector
});
module.exports = __toCommonJS(src_exports);
// src/node-http-handler.ts
var import_protocol_http = __webpack_require__(74720);
var import_querystring_builder = __webpack_require__(76176);
var import_http = __webpack_require__(13685);
var import_https = __webpack_require__(95687);
// src/constants.ts
var NODEJS_TIMEOUT_ERROR_CODES = [
    "ECONNRESET",
    "EPIPE",
    "ETIMEDOUT"
];
// src/get-transformed-headers.ts
var getTransformedHeaders = /* @__PURE__ */ __name((headers)=>{
    const transformedHeaders = {};
    for (const name of Object.keys(headers)){
        const headerValues = headers[name];
        transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
    return transformedHeaders;
}, "getTransformedHeaders");
// src/set-connection-timeout.ts
var setConnectionTimeout = /* @__PURE__ */ __name((request, reject, timeoutInMs = 0)=>{
    if (!timeoutInMs) {
        return;
    }
    const timeoutId = setTimeout(()=>{
        request.destroy();
        reject(Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
            name: "TimeoutError"
        }));
    }, timeoutInMs);
    request.on("socket", (socket)=>{
        if (socket.connecting) {
            socket.on("connect", ()=>{
                clearTimeout(timeoutId);
            });
        } else {
            clearTimeout(timeoutId);
        }
    });
}, "setConnectionTimeout");
// src/set-socket-keep-alive.ts
var setSocketKeepAlive = /* @__PURE__ */ __name((request, { keepAlive, keepAliveMsecs })=>{
    if (keepAlive !== true) {
        return;
    }
    request.on("socket", (socket)=>{
        socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
    });
}, "setSocketKeepAlive");
// src/set-socket-timeout.ts
var setSocketTimeout = /* @__PURE__ */ __name((request, reject, timeoutInMs = 0)=>{
    request.setTimeout(timeoutInMs, ()=>{
        request.destroy();
        reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), {
            name: "TimeoutError"
        }));
    });
}, "setSocketTimeout");
// src/write-request-body.ts
var import_stream = __webpack_require__(12781);
var MIN_WAIT_TIME = 1e3;
async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME) {
    const headers = request.headers ?? {};
    const expect = headers["Expect"] || headers["expect"];
    let timeoutId = -1;
    let hasError = false;
    if (expect === "100-continue") {
        await Promise.race([
            new Promise((resolve)=>{
                timeoutId = Number(setTimeout(resolve, Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
            }),
            new Promise((resolve)=>{
                httpRequest.on("continue", ()=>{
                    clearTimeout(timeoutId);
                    resolve();
                });
                httpRequest.on("error", ()=>{
                    hasError = true;
                    clearTimeout(timeoutId);
                    resolve();
                });
            })
        ]);
    }
    if (!hasError) {
        writeBody(httpRequest, request.body);
    }
}
__name(writeRequestBody, "writeRequestBody");
function writeBody(httpRequest, body) {
    if (body instanceof import_stream.Readable) {
        body.pipe(httpRequest);
        return;
    }
    if (body) {
        if (Buffer.isBuffer(body) || typeof body === "string") {
            httpRequest.end(body);
            return;
        }
        const uint8 = body;
        if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
            httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
            return;
        }
        httpRequest.end(Buffer.from(body));
        return;
    }
    httpRequest.end();
}
__name(writeBody, "writeBody");
// src/node-http-handler.ts
var DEFAULT_REQUEST_TIMEOUT = 0;
var _NodeHttpHandler = class _NodeHttpHandler {
    constructor(options){
        this.socketWarningTimestamp = 0;
        // Node http handler is hard-coded to http/1.1: https://github.com/nodejs/node/blob/ff5664b83b89c55e4ab5d5f60068fb457f1f5872/lib/_http_server.js#L286
        this.metadata = {
            handlerProtocol: "http/1.1"
        };
        this.configProvider = new Promise((resolve, reject)=>{
            if (typeof options === "function") {
                options().then((_options)=>{
                    resolve(this.resolveDefaultConfig(_options));
                }).catch(reject);
            } else {
                resolve(this.resolveDefaultConfig(options));
            }
        });
    }
    /**
   * @returns the input if it is an HttpHandler of any class,
   * or instantiates a new instance of this handler.
   */ static create(instanceOrOptions) {
        if (typeof (instanceOrOptions == null ? void 0 : instanceOrOptions.handle) === "function") {
            return instanceOrOptions;
        }
        return new _NodeHttpHandler(instanceOrOptions);
    }
    /**
   * @internal
   *
   * @param agent - http(s) agent in use by the NodeHttpHandler instance.
   * @returns timestamp of last emitted warning.
   */ static checkSocketUsage(agent, socketWarningTimestamp) {
        var _a, _b;
        const { sockets, requests, maxSockets } = agent;
        if (typeof maxSockets !== "number" || maxSockets === Infinity) {
            return socketWarningTimestamp;
        }
        const interval = 15e3;
        if (Date.now() - interval < socketWarningTimestamp) {
            return socketWarningTimestamp;
        }
        if (sockets && requests) {
            for(const origin in sockets){
                const socketsInUse = ((_a = sockets[origin]) == null ? void 0 : _a.length) ?? 0;
                const requestsEnqueued = ((_b = requests[origin]) == null ? void 0 : _b.length) ?? 0;
                if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
                    console.warn("@smithy/node-http-handler:WARN", `socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.`, "See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html", "or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.");
                    return Date.now();
                }
            }
        }
        return socketWarningTimestamp;
    }
    resolveDefaultConfig(options) {
        const { requestTimeout, connectionTimeout, socketTimeout, httpAgent, httpsAgent } = options || {};
        const keepAlive = true;
        const maxSockets = 50;
        return {
            connectionTimeout,
            requestTimeout: requestTimeout ?? socketTimeout,
            httpAgent: (()=>{
                if (httpAgent instanceof import_http.Agent || typeof (httpAgent == null ? void 0 : httpAgent.destroy) === "function") {
                    return httpAgent;
                }
                return new import_http.Agent({
                    keepAlive,
                    maxSockets,
                    ...httpAgent
                });
            })(),
            httpsAgent: (()=>{
                if (httpsAgent instanceof import_https.Agent || typeof (httpsAgent == null ? void 0 : httpsAgent.destroy) === "function") {
                    return httpsAgent;
                }
                return new import_https.Agent({
                    keepAlive,
                    maxSockets,
                    ...httpsAgent
                });
            })()
        };
    }
    destroy() {
        var _a, _b, _c, _d;
        (_b = (_a = this.config) == null ? void 0 : _a.httpAgent) == null ? void 0 : _b.destroy();
        (_d = (_c = this.config) == null ? void 0 : _c.httpsAgent) == null ? void 0 : _d.destroy();
    }
    async handle(request, { abortSignal } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        let socketCheckTimeoutId;
        return new Promise((_resolve, _reject)=>{
            let writeRequestBodyPromise = void 0;
            const resolve = /* @__PURE__ */ __name(async (arg)=>{
                await writeRequestBodyPromise;
                clearTimeout(socketCheckTimeoutId);
                _resolve(arg);
            }, "resolve");
            const reject = /* @__PURE__ */ __name(async (arg)=>{
                await writeRequestBodyPromise;
                _reject(arg);
            }, "reject");
            if (!this.config) {
                throw new Error("Node HTTP request handler config is not resolved");
            }
            if (abortSignal == null ? void 0 : abortSignal.aborted) {
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const isSSL = request.protocol === "https:";
            const agent = isSSL ? this.config.httpsAgent : this.config.httpAgent;
            socketCheckTimeoutId = setTimeout(()=>{
                this.socketWarningTimestamp = _NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp);
            }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2e3) + (this.config.connectionTimeout ?? 1e3));
            const queryString = (0, import_querystring_builder.buildQueryString)(request.query || {});
            let auth = void 0;
            if (request.username != null || request.password != null) {
                const username = request.username ?? "";
                const password = request.password ?? "";
                auth = `${username}:${password}`;
            }
            let path = request.path;
            if (queryString) {
                path += `?${queryString}`;
            }
            if (request.fragment) {
                path += `#${request.fragment}`;
            }
            const nodeHttpsOptions = {
                headers: request.headers,
                host: request.hostname,
                method: request.method,
                path,
                port: request.port,
                agent,
                auth
            };
            const requestFunc = isSSL ? import_https.request : import_http.request;
            const req = requestFunc(nodeHttpsOptions, (res)=>{
                const httpResponse = new import_protocol_http.HttpResponse({
                    statusCode: res.statusCode || -1,
                    reason: res.statusMessage,
                    headers: getTransformedHeaders(res.headers),
                    body: res
                });
                resolve({
                    response: httpResponse
                });
            });
            req.on("error", (err)=>{
                if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
                    reject(Object.assign(err, {
                        name: "TimeoutError"
                    }));
                } else {
                    reject(err);
                }
            });
            setConnectionTimeout(req, reject, this.config.connectionTimeout);
            setSocketTimeout(req, reject, this.config.requestTimeout);
            if (abortSignal) {
                abortSignal.onabort = ()=>{
                    req.abort();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
            }
            const httpAgent = nodeHttpsOptions.agent;
            if (typeof httpAgent === "object" && "keepAlive" in httpAgent) {
                setSocketKeepAlive(req, {
                    // @ts-expect-error keepAlive is not public on httpAgent.
                    keepAlive: httpAgent.keepAlive,
                    // @ts-expect-error keepAliveMsecs is not public on httpAgent.
                    keepAliveMsecs: httpAgent.keepAliveMsecs
                });
            }
            writeRequestBodyPromise = writeRequestBody(req, request, this.config.requestTimeout).catch(_reject);
        });
    }
    updateHttpClientConfig(key, value) {
        this.config = void 0;
        this.configProvider = this.configProvider.then((config)=>{
            return {
                ...config,
                [key]: value
            };
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
};
__name(_NodeHttpHandler, "NodeHttpHandler");
var NodeHttpHandler = _NodeHttpHandler;
// src/node-http2-handler.ts
var import_http22 = __webpack_require__(85158);
// src/node-http2-connection-manager.ts
var import_http2 = __toESM(__webpack_require__(85158));
// src/node-http2-connection-pool.ts
var _NodeHttp2ConnectionPool = class _NodeHttp2ConnectionPool {
    constructor(sessions){
        this.sessions = [];
        this.sessions = sessions ?? [];
    }
    poll() {
        if (this.sessions.length > 0) {
            return this.sessions.shift();
        }
    }
    offerLast(session) {
        this.sessions.push(session);
    }
    contains(session) {
        return this.sessions.includes(session);
    }
    remove(session) {
        this.sessions = this.sessions.filter((s)=>s !== session);
    }
    [Symbol.iterator]() {
        return this.sessions[Symbol.iterator]();
    }
    destroy(connection) {
        for (const session of this.sessions){
            if (session === connection) {
                if (!session.destroyed) {
                    session.destroy();
                }
            }
        }
    }
};
__name(_NodeHttp2ConnectionPool, "NodeHttp2ConnectionPool");
var NodeHttp2ConnectionPool = _NodeHttp2ConnectionPool;
// src/node-http2-connection-manager.ts
var _NodeHttp2ConnectionManager = class _NodeHttp2ConnectionManager {
    constructor(config){
        this.sessionCache = /* @__PURE__ */ new Map();
        this.config = config;
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
            throw new RangeError("maxConcurrency must be greater than zero.");
        }
    }
    lease(requestContext, connectionConfiguration) {
        const url = this.getUrlString(requestContext);
        const existingPool = this.sessionCache.get(url);
        if (existingPool) {
            const existingSession = existingPool.poll();
            if (existingSession && !this.config.disableConcurrency) {
                return existingSession;
            }
        }
        const session = import_http2.default.connect(url);
        if (this.config.maxConcurrency) {
            session.settings({
                maxConcurrentStreams: this.config.maxConcurrency
            }, (err)=>{
                if (err) {
                    throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + requestContext.destination.toString());
                }
            });
        }
        session.unref();
        const destroySessionCb = /* @__PURE__ */ __name(()=>{
            session.destroy();
            this.deleteSession(url, session);
        }, "destroySessionCb");
        session.on("goaway", destroySessionCb);
        session.on("error", destroySessionCb);
        session.on("frameError", destroySessionCb);
        session.on("close", ()=>this.deleteSession(url, session));
        if (connectionConfiguration.requestTimeout) {
            session.setTimeout(connectionConfiguration.requestTimeout, destroySessionCb);
        }
        const connectionPool = this.sessionCache.get(url) || new NodeHttp2ConnectionPool();
        connectionPool.offerLast(session);
        this.sessionCache.set(url, connectionPool);
        return session;
    }
    /**
   * Delete a session from the connection pool.
   * @param authority The authority of the session to delete.
   * @param session The session to delete.
   */ deleteSession(authority, session) {
        const existingConnectionPool = this.sessionCache.get(authority);
        if (!existingConnectionPool) {
            return;
        }
        if (!existingConnectionPool.contains(session)) {
            return;
        }
        existingConnectionPool.remove(session);
        this.sessionCache.set(authority, existingConnectionPool);
    }
    release(requestContext, session) {
        var _a;
        const cacheKey = this.getUrlString(requestContext);
        (_a = this.sessionCache.get(cacheKey)) == null ? void 0 : _a.offerLast(session);
    }
    destroy() {
        for (const [key, connectionPool] of this.sessionCache){
            for (const session of connectionPool){
                if (!session.destroyed) {
                    session.destroy();
                }
                connectionPool.remove(session);
            }
            this.sessionCache.delete(key);
        }
    }
    setMaxConcurrentStreams(maxConcurrentStreams) {
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
            throw new RangeError("maxConcurrentStreams must be greater than zero.");
        }
        this.config.maxConcurrency = maxConcurrentStreams;
    }
    setDisableConcurrentStreams(disableConcurrentStreams) {
        this.config.disableConcurrency = disableConcurrentStreams;
    }
    getUrlString(request) {
        return request.destination.toString();
    }
};
__name(_NodeHttp2ConnectionManager, "NodeHttp2ConnectionManager");
var NodeHttp2ConnectionManager = _NodeHttp2ConnectionManager;
// src/node-http2-handler.ts
var _NodeHttp2Handler = class _NodeHttp2Handler {
    constructor(options){
        this.metadata = {
            handlerProtocol: "h2"
        };
        this.connectionManager = new NodeHttp2ConnectionManager({});
        this.configProvider = new Promise((resolve, reject)=>{
            if (typeof options === "function") {
                options().then((opts)=>{
                    resolve(opts || {});
                }).catch(reject);
            } else {
                resolve(options || {});
            }
        });
    }
    /**
   * @returns the input if it is an HttpHandler of any class,
   * or instantiates a new instance of this handler.
   */ static create(instanceOrOptions) {
        if (typeof (instanceOrOptions == null ? void 0 : instanceOrOptions.handle) === "function") {
            return instanceOrOptions;
        }
        return new _NodeHttp2Handler(instanceOrOptions);
    }
    destroy() {
        this.connectionManager.destroy();
    }
    async handle(request, { abortSignal } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
            this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || false);
            if (this.config.maxConcurrentStreams) {
                this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams);
            }
        }
        const { requestTimeout, disableConcurrentStreams } = this.config;
        return new Promise((_resolve, _reject)=>{
            var _a;
            let fulfilled = false;
            let writeRequestBodyPromise = void 0;
            const resolve = /* @__PURE__ */ __name(async (arg)=>{
                await writeRequestBodyPromise;
                _resolve(arg);
            }, "resolve");
            const reject = /* @__PURE__ */ __name(async (arg)=>{
                await writeRequestBodyPromise;
                _reject(arg);
            }, "reject");
            if (abortSignal == null ? void 0 : abortSignal.aborted) {
                fulfilled = true;
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const { hostname, method, port, protocol, query } = request;
            let auth = "";
            if (request.username != null || request.password != null) {
                const username = request.username ?? "";
                const password = request.password ?? "";
                auth = `${username}:${password}@`;
            }
            const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
            const requestContext = {
                destination: new URL(authority)
            };
            const session = this.connectionManager.lease(requestContext, {
                requestTimeout: (_a = this.config) == null ? void 0 : _a.sessionTimeout,
                disableConcurrentStreams: disableConcurrentStreams || false
            });
            const rejectWithDestroy = /* @__PURE__ */ __name((err)=>{
                if (disableConcurrentStreams) {
                    this.destroySession(session);
                }
                fulfilled = true;
                reject(err);
            }, "rejectWithDestroy");
            const queryString = (0, import_querystring_builder.buildQueryString)(query || {});
            let path = request.path;
            if (queryString) {
                path += `?${queryString}`;
            }
            if (request.fragment) {
                path += `#${request.fragment}`;
            }
            const req = session.request({
                ...request.headers,
                [import_http22.constants.HTTP2_HEADER_PATH]: path,
                [import_http22.constants.HTTP2_HEADER_METHOD]: method
            });
            session.ref();
            req.on("response", (headers)=>{
                const httpResponse = new import_protocol_http.HttpResponse({
                    statusCode: headers[":status"] || -1,
                    headers: getTransformedHeaders(headers),
                    body: req
                });
                fulfilled = true;
                resolve({
                    response: httpResponse
                });
                if (disableConcurrentStreams) {
                    session.close();
                    this.connectionManager.deleteSession(authority, session);
                }
            });
            if (requestTimeout) {
                req.setTimeout(requestTimeout, ()=>{
                    req.close();
                    const timeoutError = new Error(`Stream timed out because of no activity for ${requestTimeout} ms`);
                    timeoutError.name = "TimeoutError";
                    rejectWithDestroy(timeoutError);
                });
            }
            if (abortSignal) {
                abortSignal.onabort = ()=>{
                    req.close();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    rejectWithDestroy(abortError);
                };
            }
            req.on("frameError", (type, code, id)=>{
                rejectWithDestroy(new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
            });
            req.on("error", rejectWithDestroy);
            req.on("aborted", ()=>{
                rejectWithDestroy(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`));
            });
            req.on("close", ()=>{
                session.unref();
                if (disableConcurrentStreams) {
                    session.destroy();
                }
                if (!fulfilled) {
                    rejectWithDestroy(new Error("Unexpected error: http2 request did not get a response"));
                }
            });
            writeRequestBodyPromise = writeRequestBody(req, request, requestTimeout);
        });
    }
    updateHttpClientConfig(key, value) {
        this.config = void 0;
        this.configProvider = this.configProvider.then((config)=>{
            return {
                ...config,
                [key]: value
            };
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
    /**
   * Destroys a session.
   * @param session The session to destroy.
   */ destroySession(session) {
        if (!session.destroyed) {
            session.destroy();
        }
    }
};
__name(_NodeHttp2Handler, "NodeHttp2Handler");
var NodeHttp2Handler = _NodeHttp2Handler;
// src/stream-collector/collector.ts
var _Collector = class _Collector extends import_stream.Writable {
    constructor(){
        super(...arguments);
        this.bufferedBytes = [];
    }
    _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    }
};
__name(_Collector, "Collector");
var Collector = _Collector;
// src/stream-collector/index.ts
var streamCollector = /* @__PURE__ */ __name((stream)=>new Promise((resolve, reject)=>{
        const collector = new Collector();
        stream.pipe(collector);
        stream.on("error", (err)=>{
            collector.end();
            reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function() {
            const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
            resolve(bytes);
        });
    }), "streamCollector");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 79743:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    CredentialsProviderError: ()=>CredentialsProviderError,
    ProviderError: ()=>ProviderError,
    TokenProviderError: ()=>TokenProviderError,
    chain: ()=>chain,
    fromStatic: ()=>fromStatic,
    memoize: ()=>memoize
});
module.exports = __toCommonJS(src_exports);
// src/ProviderError.ts
var _ProviderError = class _ProviderError extends Error {
    constructor(message, tryNextLink = true){
        super(message);
        this.tryNextLink = tryNextLink;
        this.name = "ProviderError";
        Object.setPrototypeOf(this, _ProviderError.prototype);
    }
    static from(error, tryNextLink = true) {
        return Object.assign(new this(error.message, tryNextLink), error);
    }
};
__name(_ProviderError, "ProviderError");
var ProviderError = _ProviderError;
// src/CredentialsProviderError.ts
var _CredentialsProviderError = class _CredentialsProviderError extends ProviderError {
    constructor(message, tryNextLink = true){
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, _CredentialsProviderError.prototype);
    }
};
__name(_CredentialsProviderError, "CredentialsProviderError");
var CredentialsProviderError = _CredentialsProviderError;
// src/TokenProviderError.ts
var _TokenProviderError = class _TokenProviderError extends ProviderError {
    constructor(message, tryNextLink = true){
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "TokenProviderError";
        Object.setPrototypeOf(this, _TokenProviderError.prototype);
    }
};
__name(_TokenProviderError, "TokenProviderError");
var TokenProviderError = _TokenProviderError;
// src/chain.ts
var chain = /* @__PURE__ */ __name((...providers)=>async ()=>{
        if (providers.length === 0) {
            throw new ProviderError("No providers in chain");
        }
        let lastProviderError;
        for (const provider of providers){
            try {
                const credentials = await provider();
                return credentials;
            } catch (err) {
                lastProviderError = err;
                if (err == null ? void 0 : err.tryNextLink) {
                    continue;
                }
                throw err;
            }
        }
        throw lastProviderError;
    }, "chain");
// src/fromStatic.ts
var fromStatic = /* @__PURE__ */ __name((staticValue)=>()=>Promise.resolve(staticValue), "fromStatic");
// src/memoize.ts
var memoize = /* @__PURE__ */ __name((provider, isExpired, requiresRefresh)=>{
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = /* @__PURE__ */ __name(async ()=>{
        if (!pending) {
            pending = provider();
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        } finally{
            pending = void 0;
        }
        return resolved;
    }, "coalesceProvider");
    if (isExpired === void 0) {
        return async (options)=>{
            if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
                resolved = await coalesceProvider();
            }
            return resolved;
        };
    }
    return async (options)=>{
        if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
            resolved = await coalesceProvider();
        }
        if (isConstant) {
            return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider();
            return resolved;
        }
        return resolved;
    };
}, "memoize");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 74720:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Field: ()=>Field,
    Fields: ()=>Fields,
    HttpRequest: ()=>HttpRequest,
    HttpResponse: ()=>HttpResponse,
    getHttpHandlerExtensionConfiguration: ()=>getHttpHandlerExtensionConfiguration,
    isValidHostname: ()=>isValidHostname,
    resolveHttpHandlerRuntimeConfig: ()=>resolveHttpHandlerRuntimeConfig
});
module.exports = __toCommonJS(src_exports);
// src/extensions/httpExtensionConfiguration.ts
var getHttpHandlerExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    let httpHandler = runtimeConfig.httpHandler;
    return {
        setHttpHandler (handler) {
            httpHandler = handler;
        },
        httpHandler () {
            return httpHandler;
        },
        updateHttpClientConfig (key, value) {
            httpHandler.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs () {
            return httpHandler.httpHandlerConfigs();
        }
    };
}, "getHttpHandlerExtensionConfiguration");
var resolveHttpHandlerRuntimeConfig = /* @__PURE__ */ __name((httpHandlerExtensionConfiguration)=>{
    return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler()
    };
}, "resolveHttpHandlerRuntimeConfig");
// src/Field.ts
var import_types = __webpack_require__(82491);
var _Field = class _Field {
    constructor({ name, kind = import_types.FieldPosition.HEADER, values = [] }){
        this.name = name;
        this.kind = kind;
        this.values = values;
    }
    /**
   * Appends a value to the field.
   *
   * @param value The value to append.
   */ add(value) {
        this.values.push(value);
    }
    /**
   * Overwrite existing field values.
   *
   * @param values The new field values.
   */ set(values) {
        this.values = values;
    }
    /**
   * Remove all matching entries from list.
   *
   * @param value Value to remove.
   */ remove(value) {
        this.values = this.values.filter((v)=>v !== value);
    }
    /**
   * Get comma-delimited string.
   *
   * @returns String representation of {@link Field}.
   */ toString() {
        return this.values.map((v)=>v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
    }
    /**
   * Get string values as a list
   *
   * @returns Values in {@link Field} as a list.
   */ get() {
        return this.values;
    }
};
__name(_Field, "Field");
var Field = _Field;
// src/Fields.ts
var _Fields = class _Fields {
    constructor({ fields = [], encoding = "utf-8" }){
        this.entries = {};
        fields.forEach(this.setField.bind(this));
        this.encoding = encoding;
    }
    /**
   * Set entry for a {@link Field} name. The `name`
   * attribute will be used to key the collection.
   *
   * @param field The {@link Field} to set.
   */ setField(field) {
        this.entries[field.name.toLowerCase()] = field;
    }
    /**
   *  Retrieve {@link Field} entry by name.
   *
   * @param name The name of the {@link Field} entry
   *  to retrieve
   * @returns The {@link Field} if it exists.
   */ getField(name) {
        return this.entries[name.toLowerCase()];
    }
    /**
   * Delete entry from collection.
   *
   * @param name Name of the entry to delete.
   */ removeField(name) {
        delete this.entries[name.toLowerCase()];
    }
    /**
   * Helper function for retrieving specific types of fields.
   * Used to grab all headers or all trailers.
   *
   * @param kind {@link FieldPosition} of entries to retrieve.
   * @returns The {@link Field} entries with the specified
   *  {@link FieldPosition}.
   */ getByType(kind) {
        return Object.values(this.entries).filter((field)=>field.kind === kind);
    }
};
__name(_Fields, "Fields");
var Fields = _Fields;
// src/httpRequest.ts
var _HttpRequest = class _HttpRequest {
    constructor(options){
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
    }
    static isInstance(request) {
        if (!request) return false;
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
    }
    clone() {
        const cloned = new _HttpRequest({
            ...this,
            headers: {
                ...this.headers
            }
        });
        if (cloned.query) cloned.query = cloneQuery(cloned.query);
        return cloned;
    }
};
__name(_HttpRequest, "HttpRequest");
var HttpRequest = _HttpRequest;
function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName)=>{
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [
                ...param
            ] : param
        };
    }, {});
}
__name(cloneQuery, "cloneQuery");
// src/httpResponse.ts
var _HttpResponse = class _HttpResponse {
    constructor(options){
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
    }
    static isInstance(response) {
        if (!response) return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
};
__name(_HttpResponse, "HttpResponse");
var HttpResponse = _HttpResponse;
// src/isValidHostname.ts
function isValidHostname(hostname) {
    const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
    return hostPattern.test(hostname);
}
__name(isValidHostname, "isValidHostname");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 76176:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    buildQueryString: ()=>buildQueryString
});
module.exports = __toCommonJS(src_exports);
var import_util_uri_escape = __webpack_require__(89521);
function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()){
        const value = query[key];
        key = (0, import_util_uri_escape.escapeUri)(key);
        if (Array.isArray(value)) {
            for(let i = 0, iLen = value.length; i < iLen; i++){
                parts.push(`${key}=${(0, import_util_uri_escape.escapeUri)(value[i])}`);
            }
        } else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${(0, import_util_uri_escape.escapeUri)(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}
__name(buildQueryString, "buildQueryString");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 32541:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    parseQueryString: ()=>parseQueryString
});
module.exports = __toCommonJS(src_exports);
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")){
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            } else if (Array.isArray(query[key])) {
                query[key].push(value);
            } else {
                query[key] = [
                    query[key],
                    value
                ];
            }
        }
    }
    return query;
}
__name(parseQueryString, "parseQueryString");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 75873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getHomeDir = void 0;
const os_1 = __webpack_require__(22037);
const path_1 = __webpack_require__(71017);
const homeDirCache = {};
const getHomeDirCacheKey = ()=>{
    if (process && process.geteuid) {
        return `${process.geteuid()}`;
    }
    return "DEFAULT";
};
const getHomeDir = ()=>{
    const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${path_1.sep}` } = process.env;
    if (HOME) return HOME;
    if (USERPROFILE) return USERPROFILE;
    if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;
    const homeDirCacheKey = getHomeDirCacheKey();
    if (!homeDirCache[homeDirCacheKey]) homeDirCache[homeDirCacheKey] = (0, os_1.homedir)();
    return homeDirCache[homeDirCacheKey];
};
exports.getHomeDir = getHomeDir;


/***/ }),

/***/ 6840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSSOTokenFilepath = void 0;
const crypto_1 = __webpack_require__(6113);
const path_1 = __webpack_require__(71017);
const getHomeDir_1 = __webpack_require__(75873);
const getSSOTokenFilepath = (id)=>{
    const hasher = (0, crypto_1.createHash)("sha1");
    const cacheName = hasher.update(id).digest("hex");
    return (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "sso", "cache", `${cacheName}.json`);
};
exports.getSSOTokenFilepath = getSSOTokenFilepath;


/***/ }),

/***/ 52161:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSSOTokenFromFile = void 0;
const fs_1 = __webpack_require__(57147);
const getSSOTokenFilepath_1 = __webpack_require__(6840);
const { readFile } = fs_1.promises;
const getSSOTokenFromFile = async (id)=>{
    const ssoTokenFilepath = (0, getSSOTokenFilepath_1.getSSOTokenFilepath)(id);
    const ssoTokenText = await readFile(ssoTokenFilepath, "utf8");
    return JSON.parse(ssoTokenText);
};
exports.getSSOTokenFromFile = getSSOTokenFromFile;


/***/ }),

/***/ 53595:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    CONFIG_PREFIX_SEPARATOR: ()=>CONFIG_PREFIX_SEPARATOR,
    DEFAULT_PROFILE: ()=>DEFAULT_PROFILE,
    ENV_PROFILE: ()=>ENV_PROFILE,
    getProfileName: ()=>getProfileName,
    loadSharedConfigFiles: ()=>loadSharedConfigFiles,
    loadSsoSessionData: ()=>loadSsoSessionData,
    parseKnownFiles: ()=>parseKnownFiles
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, __webpack_require__(75873), module.exports);
// src/getProfileName.ts
var ENV_PROFILE = "AWS_PROFILE";
var DEFAULT_PROFILE = "default";
var getProfileName = /* @__PURE__ */ __name((init)=>init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE, "getProfileName");
// src/index.ts
__reExport(src_exports, __webpack_require__(6840), module.exports);
__reExport(src_exports, __webpack_require__(52161), module.exports);
// src/getConfigData.ts
var import_types = __webpack_require__(82491);
var getConfigData = /* @__PURE__ */ __name((data)=>Object.entries(data).filter(([key])=>{
        const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
        if (indexOfSeparator === -1) {
            return false;
        }
        return Object.values(import_types.IniSectionType).includes(key.substring(0, indexOfSeparator));
    }).reduce((acc, [key, value])=>{
        const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
        const updatedKey = key.substring(0, indexOfSeparator) === import_types.IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
        acc[updatedKey] = value;
        return acc;
    }, {
        // Populate default profile, if present.
        ...data.default && {
            default: data.default
        }
    }), "getConfigData");
// src/getConfigFilepath.ts
var import_path = __webpack_require__(71017);
var import_getHomeDir = __webpack_require__(75873);
var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
var getConfigFilepath = /* @__PURE__ */ __name(()=>process.env[ENV_CONFIG_PATH] || (0, import_path.join)((0, import_getHomeDir.getHomeDir)(), ".aws", "config"), "getConfigFilepath");
// src/getCredentialsFilepath.ts
var import_getHomeDir2 = __webpack_require__(75873);
var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
var getCredentialsFilepath = /* @__PURE__ */ __name(()=>process.env[ENV_CREDENTIALS_PATH] || (0, import_path.join)((0, import_getHomeDir2.getHomeDir)(), ".aws", "credentials"), "getCredentialsFilepath");
// src/parseIni.ts
var prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
var profileNameBlockList = [
    "__proto__",
    "profile __proto__"
];
var parseIni = /* @__PURE__ */ __name((iniData)=>{
    const map = {};
    let currentSection;
    let currentSubSection;
    for (const iniLine of iniData.split(/\r?\n/)){
        const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
        const isSection = trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]";
        if (isSection) {
            currentSection = void 0;
            currentSubSection = void 0;
            const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
            const matches = prefixKeyRegex.exec(sectionName);
            if (matches) {
                const [, prefix, , name] = matches;
                if (Object.values(import_types.IniSectionType).includes(prefix)) {
                    currentSection = [
                        prefix,
                        name
                    ].join(CONFIG_PREFIX_SEPARATOR);
                }
            } else {
                currentSection = sectionName;
            }
            if (profileNameBlockList.includes(sectionName)) {
                throw new Error(`Found invalid profile name "${sectionName}"`);
            }
        } else if (currentSection) {
            const indexOfEqualsSign = trimmedLine.indexOf("=");
            if (![
                0,
                -1
            ].includes(indexOfEqualsSign)) {
                const [name, value] = [
                    trimmedLine.substring(0, indexOfEqualsSign).trim(),
                    trimmedLine.substring(indexOfEqualsSign + 1).trim()
                ];
                if (value === "") {
                    currentSubSection = name;
                } else {
                    if (currentSubSection && iniLine.trimStart() === iniLine) {
                        currentSubSection = void 0;
                    }
                    map[currentSection] = map[currentSection] || {};
                    const key = currentSubSection ? [
                        currentSubSection,
                        name
                    ].join(CONFIG_PREFIX_SEPARATOR) : name;
                    map[currentSection][key] = value;
                }
            }
        }
    }
    return map;
}, "parseIni");
// src/loadSharedConfigFiles.ts
var import_slurpFile = __webpack_require__(69701);
var swallowError = /* @__PURE__ */ __name(()=>({}), "swallowError");
var CONFIG_PREFIX_SEPARATOR = ".";
var loadSharedConfigFiles = /* @__PURE__ */ __name(async (init = {})=>{
    const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
    const parsedFiles = await Promise.all([
        (0, import_slurpFile.slurpFile)(configFilepath, {
            ignoreCache: init.ignoreCache
        }).then(parseIni).then(getConfigData).catch(swallowError),
        (0, import_slurpFile.slurpFile)(filepath, {
            ignoreCache: init.ignoreCache
        }).then(parseIni).catch(swallowError)
    ]);
    return {
        configFile: parsedFiles[0],
        credentialsFile: parsedFiles[1]
    };
}, "loadSharedConfigFiles");
// src/getSsoSessionData.ts
var getSsoSessionData = /* @__PURE__ */ __name((data)=>Object.entries(data).filter(([key])=>key.startsWith(import_types.IniSectionType.SSO_SESSION + CONFIG_PREFIX_SEPARATOR)).reduce((acc, [key, value])=>({
            ...acc,
            [key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value
        }), {}), "getSsoSessionData");
// src/loadSsoSessionData.ts
var import_slurpFile2 = __webpack_require__(69701);
var swallowError2 = /* @__PURE__ */ __name(()=>({}), "swallowError");
var loadSsoSessionData = /* @__PURE__ */ __name(async (init = {})=>(0, import_slurpFile2.slurpFile)(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError2), "loadSsoSessionData");
// src/mergeConfigFiles.ts
var mergeConfigFiles = /* @__PURE__ */ __name((...files)=>{
    const merged = {};
    for (const file of files){
        for (const [key, values] of Object.entries(file)){
            if (merged[key] !== void 0) {
                Object.assign(merged[key], values);
            } else {
                merged[key] = values;
            }
        }
    }
    return merged;
}, "mergeConfigFiles");
// src/parseKnownFiles.ts
var parseKnownFiles = /* @__PURE__ */ __name(async (init)=>{
    const parsedFiles = await loadSharedConfigFiles(init);
    return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
}, "parseKnownFiles");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 69701:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.slurpFile = void 0;
const fs_1 = __webpack_require__(57147);
const { readFile } = fs_1.promises;
const filePromisesHash = {};
const slurpFile = (path, options)=>{
    if (!filePromisesHash[path] || (options === null || options === void 0 ? void 0 : options.ignoreCache)) {
        filePromisesHash[path] = readFile(path, "utf8");
    }
    return filePromisesHash[path];
};
exports.slurpFile = slurpFile;


/***/ }),

/***/ 91562:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    SignatureV4: ()=>SignatureV4,
    clearCredentialCache: ()=>clearCredentialCache,
    createScope: ()=>createScope,
    getCanonicalHeaders: ()=>getCanonicalHeaders,
    getCanonicalQuery: ()=>getCanonicalQuery,
    getPayloadHash: ()=>getPayloadHash,
    getSigningKey: ()=>getSigningKey,
    moveHeadersToQuery: ()=>moveHeadersToQuery,
    prepareRequest: ()=>prepareRequest
});
module.exports = __toCommonJS(src_exports);
// src/SignatureV4.ts
var import_util_middleware = __webpack_require__(20362);
var import_util_utf84 = __webpack_require__(3278);
// src/constants.ts
var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
var AUTH_HEADER = "authorization";
var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
var DATE_HEADER = "date";
var GENERATED_HEADERS = [
    AUTH_HEADER,
    AMZ_DATE_HEADER,
    DATE_HEADER
];
var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
var SHA256_HEADER = "x-amz-content-sha256";
var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
var ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true
};
var PROXY_HEADER_PATTERN = /^proxy-/;
var SEC_HEADER_PATTERN = /^sec-/;
var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var MAX_CACHE_SIZE = 50;
var KEY_TYPE_IDENTIFIER = "aws4_request";
var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
// src/credentialDerivation.ts
var import_util_hex_encoding = __webpack_require__(37814);
var import_util_utf8 = __webpack_require__(3278);
var signingKeyCache = {};
var cacheQueue = [];
var createScope = /* @__PURE__ */ __name((shortDate, region, service)=>`${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`, "createScope");
var getSigningKey = /* @__PURE__ */ __name(async (sha256Constructor, credentials, shortDate, region, service)=>{
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0, import_util_hex_encoding.toHex)(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while(cacheQueue.length > MAX_CACHE_SIZE){
        delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [
        shortDate,
        region,
        service,
        KEY_TYPE_IDENTIFIER
    ]){
        key = await hmac(sha256Constructor, key, signable);
    }
    return signingKeyCache[cacheKey] = key;
}, "getSigningKey");
var clearCredentialCache = /* @__PURE__ */ __name(()=>{
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey)=>{
        delete signingKeyCache[cacheKey];
    });
}, "clearCredentialCache");
var hmac = /* @__PURE__ */ __name((ctor, secret, data)=>{
    const hash = new ctor(secret);
    hash.update((0, import_util_utf8.toUint8Array)(data));
    return hash.digest();
}, "hmac");
// src/getCanonicalHeaders.ts
var getCanonicalHeaders = /* @__PURE__ */ __name(({ headers }, unsignableHeaders, signableHeaders)=>{
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()){
        if (headers[headerName] == void 0) {
            continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders == null ? void 0 : unsignableHeaders.has(canonicalHeaderName)) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
            if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
                continue;
            }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
}, "getCanonicalHeaders");
// src/getCanonicalQuery.ts
var import_util_uri_escape = __webpack_require__(89521);
var getCanonicalQuery = /* @__PURE__ */ __name(({ query = {} })=>{
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query).sort()){
        if (key.toLowerCase() === SIGNATURE_HEADER) {
            continue;
        }
        keys.push(key);
        const value = query[key];
        if (typeof value === "string") {
            serialized[key] = `${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value)}`;
        } else if (Array.isArray(value)) {
            serialized[key] = value.slice(0).reduce((encoded, value2)=>encoded.concat([
                    `${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value2)}`
                ]), []).sort().join("&");
        }
    }
    return keys.map((key)=>serialized[key]).filter((serialized2)=>serialized2).join("&");
}, "getCanonicalQuery");
// src/getPayloadHash.ts
var import_is_array_buffer = __webpack_require__(45220);
var import_util_utf82 = __webpack_require__(3278);
var getPayloadHash = /* @__PURE__ */ __name(async ({ headers, body }, hashConstructor)=>{
    for (const headerName of Object.keys(headers)){
        if (headerName.toLowerCase() === SHA256_HEADER) {
            return headers[headerName];
        }
    }
    if (body == void 0) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    } else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, import_is_array_buffer.isArrayBuffer)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0, import_util_utf82.toUint8Array)(body));
        return (0, import_util_hex_encoding.toHex)(await hashCtor.digest());
    }
    return UNSIGNED_PAYLOAD;
}, "getPayloadHash");
// src/HeaderFormatter.ts
var import_util_utf83 = __webpack_require__(3278);
var _HeaderFormatter = class _HeaderFormatter {
    format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)){
            const bytes = (0, import_util_utf83.fromUtf8)(headerName);
            chunks.push(Uint8Array.from([
                bytes.byteLength
            ]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes)=>carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks){
            out.set(chunk, position);
            position += chunk.byteLength;
        }
        return out;
    }
    formatHeaderValue(header) {
        switch(header.type){
            case "boolean":
                return Uint8Array.from([
                    header.value ? 0 /* boolTrue */  : 1 /* boolFalse */ 
                ]);
            case "byte":
                return Uint8Array.from([
                    2 /* byte */ ,
                    header.value
                ]);
            case "short":
                const shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3 /* short */ );
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                const intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4 /* integer */ );
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                const longBytes = new Uint8Array(9);
                longBytes[0] = 5 /* long */ ;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6 /* byteArray */ );
                binView.setUint16(1, header.value.byteLength, false);
                const binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                const utf8Bytes = (0, import_util_utf83.fromUtf8)(header.value);
                const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7 /* string */ );
                strView.setUint16(1, utf8Bytes.byteLength, false);
                const strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                const tsBytes = new Uint8Array(9);
                tsBytes[0] = 8 /* timestamp */ ;
                tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error(`Invalid UUID received: ${header.value}`);
                }
                const uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9 /* uuid */ ;
                uuidBytes.set((0, import_util_hex_encoding.fromHex)(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    }
};
__name(_HeaderFormatter, "HeaderFormatter");
var HeaderFormatter = _HeaderFormatter;
var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
var _Int64 = class _Int64 {
    constructor(bytes){
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for(let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256){
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new _Int64(bytes);
    }
    /**
   * Called implicitly by infix arithmetic operators.
   */ valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
            negate(bytes);
        }
        return parseInt((0, import_util_hex_encoding.toHex)(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
};
__name(_Int64, "Int64");
var Int64 = _Int64;
function negate(bytes) {
    for(let i = 0; i < 8; i++){
        bytes[i] ^= 255;
    }
    for(let i = 7; i > -1; i--){
        bytes[i]++;
        if (bytes[i] !== 0) break;
    }
}
__name(negate, "negate");
// src/headerUtil.ts
var hasHeader = /* @__PURE__ */ __name((soughtHeader, headers)=>{
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)){
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
}, "hasHeader");
// src/cloneRequest.ts
var cloneRequest = /* @__PURE__ */ __name(({ headers, query, ...rest })=>({
        ...rest,
        headers: {
            ...headers
        },
        query: query ? cloneQuery(query) : void 0
    }), "cloneRequest");
var cloneQuery = /* @__PURE__ */ __name((query)=>Object.keys(query).reduce((carry, paramName)=>{
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [
                ...param
            ] : param
        };
    }, {}), "cloneQuery");
// src/moveHeadersToQuery.ts
var moveHeadersToQuery = /* @__PURE__ */ __name((request, options = {})=>{
    var _a;
    const { headers, query = {} } = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
    for (const name of Object.keys(headers)){
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !((_a = options.unhoistableHeaders) == null ? void 0 : _a.has(lname))) {
            query[name] = headers[name];
            delete headers[name];
        }
    }
    return {
        ...request,
        headers,
        query
    };
}, "moveHeadersToQuery");
// src/prepareRequest.ts
var prepareRequest = /* @__PURE__ */ __name((request)=>{
    request = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
    for (const headerName of Object.keys(request.headers)){
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
            delete request.headers[headerName];
        }
    }
    return request;
}, "prepareRequest");
// src/utilDate.ts
var iso8601 = /* @__PURE__ */ __name((time)=>toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601");
var toDate = /* @__PURE__ */ __name((time)=>{
    if (typeof time === "number") {
        return new Date(time * 1e3);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1e3);
        }
        return new Date(time);
    }
    return time;
}, "toDate");
// src/SignatureV4.ts
var _SignatureV4 = class _SignatureV4 {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }){
        this.headerFormatter = new HeaderFormatter();
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0, import_util_middleware.normalizeProvider)(region);
        this.credentialProvider = (0, import_util_middleware.normalizeProvider)(credentials);
    }
    async presign(originalRequest, options = {}) {
        const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, signingRegion, signingService } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
            return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), {
            unhoistableHeaders
        });
        if (credentials.sessionToken) {
            request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
        return request;
    }
    async sign(toSign, options) {
        if (typeof toSign === "string") {
            return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
            return this.signEvent(toSign, options);
        } else if (toSign.message) {
            return this.signMessage(toSign, options);
        } else {
            return this.signRequest(toSign, options);
        }
    }
    async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({
            headers: {},
            body: payload
        }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0, import_util_hex_encoding.toHex)(await hash.digest());
        const stringToSign = [
            EVENT_ALGORITHM_IDENTIFIER,
            longDate,
            scope,
            priorSignature,
            hashedHeaders,
            hashedPayload
        ].join("\n");
        return this.signString(stringToSign, {
            signingDate,
            signingRegion: region,
            signingService
        });
    }
    async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService }) {
        const promise = this.signEvent({
            headers: this.headerFormatter.format(signableMessage.message.headers),
            payload: signableMessage.message.body
        }, {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature
        });
        return promise.then((signature)=>{
            return {
                message: signableMessage.message,
                signature
            };
        });
    }
    async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0, import_util_utf84.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
    }
    async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
            request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
            request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
        return request;
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name)=>`${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest) {
        const hash = new this.sha256();
        hash.update((0, import_util_utf84.toUint8Array)(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${(0, import_util_hex_encoding.toHex)(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
            const normalizedPathSegments = [];
            for (const pathSegment of path.split("/")){
                if ((pathSegment == null ? void 0 : pathSegment.length) === 0) continue;
                if (pathSegment === ".") continue;
                if (pathSegment === "..") {
                    normalizedPathSegments.pop();
                } else {
                    normalizedPathSegments.push(pathSegment);
                }
            }
            const normalizedPath = `${(path == null ? void 0 : path.startsWith("/")) ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && (path == null ? void 0 : path.endsWith("/")) ? "/" : ""}`;
            const doubleEncoded = encodeURIComponent(normalizedPath);
            return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);
        const hash = new this.sha256(await keyPromise);
        hash.update((0, import_util_utf84.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
    }
    validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || // @ts-expect-error: Property 'accessKeyId' does not exist on type 'object'.ts(2339)
        typeof credentials.accessKeyId !== "string" || // @ts-expect-error: Property 'secretAccessKey' does not exist on type 'object'.ts(2339)
        typeof credentials.secretAccessKey !== "string") {
            throw new Error("Resolved credential object is not valid");
        }
    }
};
__name(_SignatureV4, "SignatureV4");
var SignatureV4 = _SignatureV4;
var formatDate = /* @__PURE__ */ __name((now)=>{
    const longDate = iso8601(now).replace(/[\-:]/g, "");
    return {
        longDate,
        shortDate: longDate.slice(0, 8)
    };
}, "formatDate");
var getCanonicalHeaderList = /* @__PURE__ */ __name((headers)=>Object.keys(headers).sort().join(";"), "getCanonicalHeaderList");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 5660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Client: ()=>Client,
    Command: ()=>Command,
    LazyJsonString: ()=>LazyJsonString,
    NoOpLogger: ()=>NoOpLogger,
    SENSITIVE_STRING: ()=>SENSITIVE_STRING,
    ServiceException: ()=>ServiceException,
    StringWrapper: ()=>StringWrapper,
    _json: ()=>_json,
    collectBody: ()=>collectBody,
    convertMap: ()=>convertMap,
    createAggregatedClient: ()=>createAggregatedClient,
    dateToUtcString: ()=>dateToUtcString,
    decorateServiceException: ()=>decorateServiceException,
    emitWarningIfUnsupportedVersion: ()=>emitWarningIfUnsupportedVersion,
    expectBoolean: ()=>expectBoolean,
    expectByte: ()=>expectByte,
    expectFloat32: ()=>expectFloat32,
    expectInt: ()=>expectInt,
    expectInt32: ()=>expectInt32,
    expectLong: ()=>expectLong,
    expectNonNull: ()=>expectNonNull,
    expectNumber: ()=>expectNumber,
    expectObject: ()=>expectObject,
    expectShort: ()=>expectShort,
    expectString: ()=>expectString,
    expectUnion: ()=>expectUnion,
    extendedEncodeURIComponent: ()=>extendedEncodeURIComponent,
    getArrayIfSingleItem: ()=>getArrayIfSingleItem,
    getDefaultClientConfiguration: ()=>getDefaultClientConfiguration,
    getDefaultExtensionConfiguration: ()=>getDefaultExtensionConfiguration,
    getValueFromTextNode: ()=>getValueFromTextNode,
    handleFloat: ()=>handleFloat,
    limitedParseDouble: ()=>limitedParseDouble,
    limitedParseFloat: ()=>limitedParseFloat,
    limitedParseFloat32: ()=>limitedParseFloat32,
    loadConfigsForDefaultMode: ()=>loadConfigsForDefaultMode,
    logger: ()=>logger,
    map: ()=>map,
    parseBoolean: ()=>parseBoolean,
    parseEpochTimestamp: ()=>parseEpochTimestamp,
    parseRfc3339DateTime: ()=>parseRfc3339DateTime,
    parseRfc3339DateTimeWithOffset: ()=>parseRfc3339DateTimeWithOffset,
    parseRfc7231DateTime: ()=>parseRfc7231DateTime,
    resolveDefaultRuntimeConfig: ()=>resolveDefaultRuntimeConfig,
    resolvedPath: ()=>resolvedPath,
    serializeFloat: ()=>serializeFloat,
    splitEvery: ()=>splitEvery,
    strictParseByte: ()=>strictParseByte,
    strictParseDouble: ()=>strictParseDouble,
    strictParseFloat: ()=>strictParseFloat,
    strictParseFloat32: ()=>strictParseFloat32,
    strictParseInt: ()=>strictParseInt,
    strictParseInt32: ()=>strictParseInt32,
    strictParseLong: ()=>strictParseLong,
    strictParseShort: ()=>strictParseShort,
    take: ()=>take,
    throwDefaultError: ()=>throwDefaultError,
    withBaseException: ()=>withBaseException
});
module.exports = __toCommonJS(src_exports);
// src/NoOpLogger.ts
var _NoOpLogger = class _NoOpLogger {
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
};
__name(_NoOpLogger, "NoOpLogger");
var NoOpLogger = _NoOpLogger;
// src/client.ts
var import_middleware_stack = __webpack_require__(23073);
var _Client = class _Client {
    constructor(config){
        this.middlewareStack = (0, import_middleware_stack.constructStack)();
        this.config = config;
    }
    send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        if (callback) {
            handler(command).then((result)=>callback(null, result.output), (err)=>callback(err)).catch(// prevent any errors thrown in the callback from triggering an
            // unhandled promise rejection
            ()=>{});
        } else {
            return handler(command).then((result)=>result.output);
        }
    }
    destroy() {
        if (this.config.requestHandler.destroy) this.config.requestHandler.destroy();
    }
};
__name(_Client, "Client");
var Client = _Client;
// src/collect-stream-body.ts
var import_util_stream = __webpack_require__(28750);
var collectBody = /* @__PURE__ */ __name(async (streamBody = new Uint8Array(), context)=>{
    if (streamBody instanceof Uint8Array) {
        return import_util_stream.Uint8ArrayBlobAdapter.mutate(streamBody);
    }
    if (!streamBody) {
        return import_util_stream.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
    }
    const fromContext = context.streamCollector(streamBody);
    return import_util_stream.Uint8ArrayBlobAdapter.mutate(await fromContext);
}, "collectBody");
// src/command.ts
var import_types = __webpack_require__(82491);
var _Command = class _Command {
    constructor(){
        this.middlewareStack = (0, import_middleware_stack.constructStack)();
    }
    /**
   * Factory for Command ClassBuilder.
   * @internal
   */ static classBuilder() {
        return new ClassBuilder();
    }
    /**
   * @internal
   */ resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)){
            this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger: logger2 } = configuration;
        const handlerExecutionContext = {
            logger: logger2,
            clientName,
            commandName,
            inputFilterSensitiveLog,
            outputFilterSensitiveLog,
            [import_types.SMITHY_CONTEXT_KEY]: {
                ...smithyContext
            },
            ...additionalContext
        };
        const { requestHandler } = configuration;
        return stack.resolve((request)=>requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
};
__name(_Command, "Command");
var Command = _Command;
var _ClassBuilder = class _ClassBuilder {
    constructor(){
        this._init = ()=>{};
        this._ep = {};
        this._middlewareFn = ()=>[];
        this._commandName = "";
        this._clientName = "";
        this._additionalContext = {};
        this._smithyContext = {};
        this._inputFilterSensitiveLog = (_)=>_;
        this._outputFilterSensitiveLog = (_)=>_;
        this._serializer = null;
        this._deserializer = null;
    }
    /**
   * Optional init callback.
   */ init(cb) {
        this._init = cb;
    }
    /**
   * Set the endpoint parameter instructions.
   */ ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
    }
    /**
   * Add any number of middleware.
   */ m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
    }
    /**
   * Set the initial handler execution context Smithy field.
   */ s(service, operation, smithyContext = {}) {
        this._smithyContext = {
            service,
            operation,
            ...smithyContext
        };
        return this;
    }
    /**
   * Set the initial handler execution context.
   */ c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
    }
    /**
   * Set constant string identifiers for the operation.
   */ n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
    }
    /**
   * Set the input and output sensistive log filters.
   */ f(inputFilter = (_)=>_, outputFilter = (_)=>_) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
    }
    /**
   * Sets the serializer.
   */ ser(serializer) {
        this._serializer = serializer;
        return this;
    }
    /**
   * Sets the deserializer.
   */ de(deserializer) {
        this._deserializer = deserializer;
        return this;
    }
    /**
   * @returns a Command class with the classBuilder properties.
   */ build() {
        var _a;
        const closure = this;
        let CommandRef;
        return CommandRef = (_a = class extends Command {
            /**
       * @public
       */ constructor(...[input]){
                super();
                /**
         * @internal
         */ // @ts-ignore used in middlewareFn closure.
                this.serialize = closure._serializer;
                /**
         * @internal
         */ // @ts-ignore used in middlewareFn closure.
                this.deserialize = closure._deserializer;
                this.input = input ?? {};
                closure._init(this);
            }
            /**
       * @public
       */ static getEndpointParameterInstructions() {
                return closure._ep;
            }
            /**
       * @internal
       */ resolveMiddleware(stack, configuration, options) {
                return this.resolveMiddlewareWithContext(stack, configuration, options, {
                    CommandCtor: CommandRef,
                    middlewareFn: closure._middlewareFn,
                    clientName: closure._clientName,
                    commandName: closure._commandName,
                    inputFilterSensitiveLog: closure._inputFilterSensitiveLog,
                    outputFilterSensitiveLog: closure._outputFilterSensitiveLog,
                    smithyContext: closure._smithyContext,
                    additionalContext: closure._additionalContext
                });
            }
        }, __name(_a, "CommandRef"), _a);
    }
};
__name(_ClassBuilder, "ClassBuilder");
var ClassBuilder = _ClassBuilder;
// src/constants.ts
var SENSITIVE_STRING = "***SensitiveInformation***";
// src/create-aggregated-client.ts
var createAggregatedClient = /* @__PURE__ */ __name((commands, Client2)=>{
    for (const command of Object.keys(commands)){
        const CommandCtor = commands[command];
        const methodImpl = /* @__PURE__ */ __name(async function(args, optionsOrCb, cb) {
            const command2 = new CommandCtor(args);
            if (typeof optionsOrCb === "function") {
                this.send(command2, optionsOrCb);
            } else if (typeof cb === "function") {
                if (typeof optionsOrCb !== "object") throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
                this.send(command2, optionsOrCb || {}, cb);
            } else {
                return this.send(command2, optionsOrCb);
            }
        }, "methodImpl");
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client2.prototype[methodName] = methodImpl;
    }
}, "createAggregatedClient");
// src/parse-utils.ts
var parseBoolean = /* @__PURE__ */ __name((value)=>{
    switch(value){
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error(`Unable to parse boolean value "${value}"`);
    }
}, "parseBoolean");
var expectBoolean = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
}, "expectBoolean");
var expectNumber = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
}, "expectNumber");
var MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
var expectFloat32 = /* @__PURE__ */ __name((value)=>{
    const expected = expectNumber(value);
    if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
    }
    return expected;
}, "expectFloat32");
var expectLong = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
}, "expectLong");
var expectInt = expectLong;
var expectInt32 = /* @__PURE__ */ __name((value)=>expectSizedInt(value, 32), "expectInt32");
var expectShort = /* @__PURE__ */ __name((value)=>expectSizedInt(value, 16), "expectShort");
var expectByte = /* @__PURE__ */ __name((value)=>expectSizedInt(value, 8), "expectByte");
var expectSizedInt = /* @__PURE__ */ __name((value, size)=>{
    const expected = expectLong(value);
    if (expected !== void 0 && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
}, "expectSizedInt");
var castInt = /* @__PURE__ */ __name((value, size)=>{
    switch(size){
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
}, "castInt");
var expectNonNull = /* @__PURE__ */ __name((value, location)=>{
    if (value === null || value === void 0) {
        if (location) {
            throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
}, "expectNonNull");
var expectObject = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
}, "expectObject");
var expectString = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value === "string") {
        return value;
    }
    if ([
        "boolean",
        "number",
        "bigint"
    ].includes(typeof value)) {
        logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
}, "expectString");
var expectUnion = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject).filter(([, v])=>v != null).map(([k])=>k);
    if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
}, "expectUnion");
var strictParseDouble = /* @__PURE__ */ __name((value)=>{
    if (typeof value == "string") {
        return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
}, "strictParseDouble");
var strictParseFloat = strictParseDouble;
var strictParseFloat32 = /* @__PURE__ */ __name((value)=>{
    if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
}, "strictParseFloat32");
var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
var parseNumber = /* @__PURE__ */ __name((value)=>{
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
}, "parseNumber");
var limitedParseDouble = /* @__PURE__ */ __name((value)=>{
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectNumber(value);
}, "limitedParseDouble");
var handleFloat = limitedParseDouble;
var limitedParseFloat = limitedParseDouble;
var limitedParseFloat32 = /* @__PURE__ */ __name((value)=>{
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectFloat32(value);
}, "limitedParseFloat32");
var parseFloatString = /* @__PURE__ */ __name((value)=>{
    switch(value){
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error(`Unable to parse float value: ${value}`);
    }
}, "parseFloatString");
var strictParseLong = /* @__PURE__ */ __name((value)=>{
    if (typeof value === "string") {
        return expectLong(parseNumber(value));
    }
    return expectLong(value);
}, "strictParseLong");
var strictParseInt = strictParseLong;
var strictParseInt32 = /* @__PURE__ */ __name((value)=>{
    if (typeof value === "string") {
        return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
}, "strictParseInt32");
var strictParseShort = /* @__PURE__ */ __name((value)=>{
    if (typeof value === "string") {
        return expectShort(parseNumber(value));
    }
    return expectShort(value);
}, "strictParseShort");
var strictParseByte = /* @__PURE__ */ __name((value)=>{
    if (typeof value === "string") {
        return expectByte(parseNumber(value));
    }
    return expectByte(value);
}, "strictParseByte");
var stackTraceWarning = /* @__PURE__ */ __name((message)=>{
    return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s)=>!s.includes("stackTraceWarning")).join("\n");
}, "stackTraceWarning");
var logger = {
    warn: console.warn
};
// src/date-utils.ts
var DAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
var MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
__name(dateToUtcString, "dateToUtcString");
var RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
var parseRfc3339DateTime = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
    });
}, "parseRfc3339DateTime");
var RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
var parseRfc3339DateTimeWithOffset = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date = buildDate(year, month, day, {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
    });
    if (offsetStr.toUpperCase() != "Z") {
        date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date;
}, "parseRfc3339DateTimeWithOffset");
var IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
var RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
var ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
var parseRfc7231DateTime = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
}, "parseRfc7231DateTime");
var parseEpochTimestamp = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return void 0;
    }
    let valueAsDouble;
    if (typeof value === "number") {
        valueAsDouble = value;
    } else if (typeof value === "string") {
        valueAsDouble = strictParseDouble(value);
    } else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1e3));
}, "parseEpochTimestamp");
var buildDate = /* @__PURE__ */ __name((year, month, day, time)=>{
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), // seconds can go up to 60 for leap seconds
    parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
}, "buildDate");
var parseTwoDigitYear = /* @__PURE__ */ __name((value)=>{
    const thisYear = /* @__PURE__ */ new Date().getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
    }
    return valueInThisCentury;
}, "parseTwoDigitYear");
var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
var adjustRfc850Year = /* @__PURE__ */ __name((input)=>{
    if (input.getTime() - /* @__PURE__ */ new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
}, "adjustRfc850Year");
var parseMonthByShortName = /* @__PURE__ */ __name((value)=>{
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
}, "parseMonthByShortName");
var DAYS_IN_MONTH = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
var validateDayOfMonth = /* @__PURE__ */ __name((year, month, day)=>{
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
    }
    if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
}, "validateDayOfMonth");
var isLeapYear = /* @__PURE__ */ __name((year)=>{
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}, "isLeapYear");
var parseDateValue = /* @__PURE__ */ __name((value, type, lower, upper)=>{
    const dateVal = strictParseByte(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
}, "parseDateValue");
var parseMilliseconds = /* @__PURE__ */ __name((value)=>{
    if (value === null || value === void 0) {
        return 0;
    }
    return strictParseFloat32("0." + value) * 1e3;
}, "parseMilliseconds");
var parseOffsetToMilliseconds = /* @__PURE__ */ __name((value)=>{
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
        direction = 1;
    } else if (directionStr == "-") {
        direction = -1;
    } else {
        throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1e3;
}, "parseOffsetToMilliseconds");
var stripLeadingZeroes = /* @__PURE__ */ __name((value)=>{
    let idx = 0;
    while(idx < value.length - 1 && value.charAt(idx) === "0"){
        idx++;
    }
    if (idx === 0) {
        return value;
    }
    return value.slice(idx);
}, "stripLeadingZeroes");
// src/exceptions.ts
var _ServiceException = class _ServiceException extends Error {
    constructor(options){
        super(options.message);
        Object.setPrototypeOf(this, _ServiceException.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
    }
};
__name(_ServiceException, "ServiceException");
var ServiceException = _ServiceException;
var decorateServiceException = /* @__PURE__ */ __name((exception, additions = {})=>{
    Object.entries(additions).filter(([, v])=>v !== void 0).forEach(([k, v])=>{
        if (exception[k] == void 0 || exception[k] === "") {
            exception[k] = v;
        }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
}, "decorateServiceException");
// src/default-error-handler.ts
var throwDefaultError = /* @__PURE__ */ __name(({ output, parsedBody, exceptionCtor, errorCode })=>{
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : void 0;
    const response = new exceptionCtor({
        name: (parsedBody == null ? void 0 : parsedBody.code) || (parsedBody == null ? void 0 : parsedBody.Code) || errorCode || statusCode || "UnknownError",
        $fault: "client",
        $metadata
    });
    throw decorateServiceException(response, parsedBody);
}, "throwDefaultError");
var withBaseException = /* @__PURE__ */ __name((ExceptionCtor)=>{
    return ({ output, parsedBody, errorCode })=>{
        throwDefaultError({
            output,
            parsedBody,
            exceptionCtor: ExceptionCtor,
            errorCode
        });
    };
}, "withBaseException");
var deserializeMetadata = /* @__PURE__ */ __name((output)=>({
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
    }), "deserializeMetadata");
// src/defaults-mode.ts
var loadConfigsForDefaultMode = /* @__PURE__ */ __name((mode)=>{
    switch(mode){
        case "standard":
            return {
                retryMode: "standard",
                connectionTimeout: 3100
            };
        case "in-region":
            return {
                retryMode: "standard",
                connectionTimeout: 1100
            };
        case "cross-region":
            return {
                retryMode: "standard",
                connectionTimeout: 3100
            };
        case "mobile":
            return {
                retryMode: "standard",
                connectionTimeout: 3e4
            };
        default:
            return {};
    }
}, "loadConfigsForDefaultMode");
// src/emitWarningIfUnsupportedVersion.ts
var warningEmitted = false;
var emitWarningIfUnsupportedVersion = /* @__PURE__ */ __name((version)=>{
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 14) {
        warningEmitted = true;
    }
}, "emitWarningIfUnsupportedVersion");
// src/extensions/checksum.ts
var getChecksumConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    const checksumAlgorithms = [];
    for(const id in import_types.AlgorithmId){
        const algorithmId = import_types.AlgorithmId[id];
        if (runtimeConfig[algorithmId] === void 0) {
            continue;
        }
        checksumAlgorithms.push({
            algorithmId: ()=>algorithmId,
            checksumConstructor: ()=>runtimeConfig[algorithmId]
        });
    }
    return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm (algo) {
            this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms () {
            return this._checksumAlgorithms;
        }
    };
}, "getChecksumConfiguration");
var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name((clientConfig)=>{
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm)=>{
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
}, "resolveChecksumRuntimeConfig");
// src/extensions/retry.ts
var getRetryConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    let _retryStrategy = runtimeConfig.retryStrategy;
    return {
        setRetryStrategy (retryStrategy) {
            _retryStrategy = retryStrategy;
        },
        retryStrategy () {
            return _retryStrategy;
        }
    };
}, "getRetryConfiguration");
var resolveRetryRuntimeConfig = /* @__PURE__ */ __name((retryStrategyConfiguration)=>{
    const runtimeConfig = {};
    runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
    return runtimeConfig;
}, "resolveRetryRuntimeConfig");
// src/extensions/defaultExtensionConfiguration.ts
var getDefaultExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    return {
        ...getChecksumConfiguration(runtimeConfig),
        ...getRetryConfiguration(runtimeConfig)
    };
}, "getDefaultExtensionConfiguration");
var getDefaultClientConfiguration = getDefaultExtensionConfiguration;
var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name((config)=>{
    return {
        ...resolveChecksumRuntimeConfig(config),
        ...resolveRetryRuntimeConfig(config)
    };
}, "resolveDefaultRuntimeConfig");
// src/extended-encode-uri-component.ts
function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
__name(extendedEncodeURIComponent, "extendedEncodeURIComponent");
// src/get-array-if-single-item.ts
var getArrayIfSingleItem = /* @__PURE__ */ __name((mayBeArray)=>Array.isArray(mayBeArray) ? mayBeArray : [
        mayBeArray
    ], "getArrayIfSingleItem");
// src/get-value-from-text-node.ts
var getValueFromTextNode = /* @__PURE__ */ __name((obj)=>{
    const textNodeName = "#text";
    for(const key in obj){
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) {
            obj[key] = obj[key][textNodeName];
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = getValueFromTextNode(obj[key]);
        }
    }
    return obj;
}, "getValueFromTextNode");
// src/lazy-json.ts
var StringWrapper = /* @__PURE__ */ __name(function() {
    const Class = Object.getPrototypeOf(this).constructor;
    const Constructor = Function.bind.apply(String, [
        null,
        ...arguments
    ]);
    const instance = new Constructor();
    Object.setPrototypeOf(instance, Class.prototype);
    return instance;
}, "StringWrapper");
StringWrapper.prototype = Object.create(String.prototype, {
    constructor: {
        value: StringWrapper,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
Object.setPrototypeOf(StringWrapper, String);
var _LazyJsonString = class _LazyJsonString extends StringWrapper {
    deserializeJSON() {
        return JSON.parse(super.toString());
    }
    toJSON() {
        return super.toString();
    }
    static fromObject(object) {
        if (object instanceof _LazyJsonString) {
            return object;
        } else if (object instanceof String || typeof object === "string") {
            return new _LazyJsonString(object);
        }
        return new _LazyJsonString(JSON.stringify(object));
    }
};
__name(_LazyJsonString, "LazyJsonString");
var LazyJsonString = _LazyJsonString;
// src/object-mapping.ts
function map(arg0, arg1, arg2) {
    let target;
    let filter;
    let instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
    } else {
        target = arg0;
        if (typeof arg1 === "function") {
            filter = arg1;
            instructions = arg2;
            return mapWithFilter(target, filter, instructions);
        } else {
            instructions = arg1;
        }
    }
    for (const key of Object.keys(instructions)){
        if (!Array.isArray(instructions[key])) {
            target[key] = instructions[key];
            continue;
        }
        applyInstruction(target, null, instructions, key);
    }
    return target;
}
__name(map, "map");
var convertMap = /* @__PURE__ */ __name((target)=>{
    const output = {};
    for (const [k, v] of Object.entries(target || {})){
        output[k] = [
            ,
            v
        ];
    }
    return output;
}, "convertMap");
var take = /* @__PURE__ */ __name((source, instructions)=>{
    const out = {};
    for(const key in instructions){
        applyInstruction(out, source, instructions, key);
    }
    return out;
}, "take");
var mapWithFilter = /* @__PURE__ */ __name((target, filter, instructions)=>{
    return map(target, Object.entries(instructions).reduce((_instructions, [key, value])=>{
        if (Array.isArray(value)) {
            _instructions[key] = value;
        } else {
            if (typeof value === "function") {
                _instructions[key] = [
                    filter,
                    value()
                ];
            } else {
                _instructions[key] = [
                    filter,
                    value
                ];
            }
        }
        return _instructions;
    }, {}));
}, "mapWithFilter");
var applyInstruction = /* @__PURE__ */ __name((target, source, instructions, targetKey)=>{
    if (source !== null) {
        let instruction = instructions[targetKey];
        if (typeof instruction === "function") {
            instruction = [
                ,
                instruction
            ];
        }
        const [filter2 = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
        if (typeof filter2 === "function" && filter2(source[sourceKey]) || typeof filter2 !== "function" && !!filter2) {
            target[targetKey] = valueFn(source[sourceKey]);
        }
        return;
    }
    let [filter, value] = instructions[targetKey];
    if (typeof value === "function") {
        let _value;
        const defaultFilterPassed = filter === void 0 && (_value = value()) != null;
        const customFilterPassed = typeof filter === "function" && !!filter(void 0) || typeof filter !== "function" && !!filter;
        if (defaultFilterPassed) {
            target[targetKey] = _value;
        } else if (customFilterPassed) {
            target[targetKey] = value();
        }
    } else {
        const defaultFilterPassed = filter === void 0 && value != null;
        const customFilterPassed = typeof filter === "function" && !!filter(value) || typeof filter !== "function" && !!filter;
        if (defaultFilterPassed || customFilterPassed) {
            target[targetKey] = value;
        }
    }
}, "applyInstruction");
var nonNullish = /* @__PURE__ */ __name((_)=>_ != null, "nonNullish");
var pass = /* @__PURE__ */ __name((_)=>_, "pass");
// src/resolve-path.ts
var resolvedPath = /* @__PURE__ */ __name((resolvedPath2, input, memberName, labelValueProvider, uriLabel, isGreedyLabel)=>{
    if (input != null && input[memberName] !== void 0) {
        const labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath2 = resolvedPath2.replace(uriLabel, isGreedyLabel ? labelValue.split("/").map((segment)=>extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue));
    } else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath2;
}, "resolvedPath");
// src/ser-utils.ts
var serializeFloat = /* @__PURE__ */ __name((value)=>{
    if (value !== value) {
        return "NaN";
    }
    switch(value){
        case Infinity:
            return "Infinity";
        case -Infinity:
            return "-Infinity";
        default:
            return value;
    }
}, "serializeFloat");
// src/serde-json.ts
var _json = /* @__PURE__ */ __name((obj)=>{
    if (obj == null) {
        return {};
    }
    if (Array.isArray(obj)) {
        return obj.filter((_)=>_ != null).map(_json);
    }
    if (typeof obj === "object") {
        const target = {};
        for (const key of Object.keys(obj)){
            if (obj[key] == null) {
                continue;
            }
            target[key] = _json(obj[key]);
        }
        return target;
    }
    return obj;
}, "_json");
// src/split-every.ts
function splitEvery(value, delimiter, numDelimiters) {
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    if (numDelimiters === 1) {
        return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for(let i = 0; i < segments.length; i++){
        if (currentSegment === "") {
            currentSegment = segments[i];
        } else {
            currentSegment += delimiter + segments[i];
        }
        if ((i + 1) % numDelimiters === 0) {
            compoundSegments.push(currentSegment);
            currentSegment = "";
        }
    }
    if (currentSegment !== "") {
        compoundSegments.push(currentSegment);
    }
    return compoundSegments;
}
__name(splitEvery, "splitEvery");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 82491:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    AlgorithmId: ()=>AlgorithmId,
    EndpointURLScheme: ()=>EndpointURLScheme,
    FieldPosition: ()=>FieldPosition,
    HttpApiKeyAuthLocation: ()=>HttpApiKeyAuthLocation,
    HttpAuthLocation: ()=>HttpAuthLocation,
    IniSectionType: ()=>IniSectionType,
    RequestHandlerProtocol: ()=>RequestHandlerProtocol,
    SMITHY_CONTEXT_KEY: ()=>SMITHY_CONTEXT_KEY,
    getDefaultClientConfiguration: ()=>getDefaultClientConfiguration,
    resolveDefaultRuntimeConfig: ()=>resolveDefaultRuntimeConfig
});
module.exports = __toCommonJS(src_exports);
// src/auth/auth.ts
var HttpAuthLocation = /* @__PURE__ */ ((HttpAuthLocation2)=>{
    HttpAuthLocation2["HEADER"] = "header";
    HttpAuthLocation2["QUERY"] = "query";
    return HttpAuthLocation2;
})(HttpAuthLocation || {});
// src/auth/HttpApiKeyAuth.ts
var HttpApiKeyAuthLocation = /* @__PURE__ */ ((HttpApiKeyAuthLocation2)=>{
    HttpApiKeyAuthLocation2["HEADER"] = "header";
    HttpApiKeyAuthLocation2["QUERY"] = "query";
    return HttpApiKeyAuthLocation2;
})(HttpApiKeyAuthLocation || {});
// src/endpoint.ts
var EndpointURLScheme = /* @__PURE__ */ ((EndpointURLScheme2)=>{
    EndpointURLScheme2["HTTP"] = "http";
    EndpointURLScheme2["HTTPS"] = "https";
    return EndpointURLScheme2;
})(EndpointURLScheme || {});
// src/extensions/checksum.ts
var AlgorithmId = /* @__PURE__ */ ((AlgorithmId2)=>{
    AlgorithmId2["MD5"] = "md5";
    AlgorithmId2["CRC32"] = "crc32";
    AlgorithmId2["CRC32C"] = "crc32c";
    AlgorithmId2["SHA1"] = "sha1";
    AlgorithmId2["SHA256"] = "sha256";
    return AlgorithmId2;
})(AlgorithmId || {});
var getChecksumConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    const checksumAlgorithms = [];
    if (runtimeConfig.sha256 !== void 0) {
        checksumAlgorithms.push({
            algorithmId: ()=>"sha256" /* SHA256 */ ,
            checksumConstructor: ()=>runtimeConfig.sha256
        });
    }
    if (runtimeConfig.md5 != void 0) {
        checksumAlgorithms.push({
            algorithmId: ()=>"md5" /* MD5 */ ,
            checksumConstructor: ()=>runtimeConfig.md5
        });
    }
    return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm (algo) {
            this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms () {
            return this._checksumAlgorithms;
        }
    };
}, "getChecksumConfiguration");
var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name((clientConfig)=>{
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm)=>{
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
}, "resolveChecksumRuntimeConfig");
// src/extensions/defaultClientConfiguration.ts
var getDefaultClientConfiguration = /* @__PURE__ */ __name((runtimeConfig)=>{
    return {
        ...getChecksumConfiguration(runtimeConfig)
    };
}, "getDefaultClientConfiguration");
var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name((config)=>{
    return {
        ...resolveChecksumRuntimeConfig(config)
    };
}, "resolveDefaultRuntimeConfig");
// src/http.ts
var FieldPosition = /* @__PURE__ */ ((FieldPosition2)=>{
    FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
    FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
    return FieldPosition2;
})(FieldPosition || {});
// src/middleware.ts
var SMITHY_CONTEXT_KEY = "__smithy_context";
// src/profile.ts
var IniSectionType = /* @__PURE__ */ ((IniSectionType2)=>{
    IniSectionType2["PROFILE"] = "profile";
    IniSectionType2["SSO_SESSION"] = "sso-session";
    IniSectionType2["SERVICES"] = "services";
    return IniSectionType2;
})(IniSectionType || {});
// src/transfer.ts
var RequestHandlerProtocol = /* @__PURE__ */ ((RequestHandlerProtocol2)=>{
    RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
    RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
    RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
    return RequestHandlerProtocol2;
})(RequestHandlerProtocol || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 95969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    parseUrl: ()=>parseUrl
});
module.exports = __toCommonJS(src_exports);
var import_querystring_parser = __webpack_require__(32541);
var parseUrl = /* @__PURE__ */ __name((url)=>{
    if (typeof url === "string") {
        return parseUrl(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
        query = (0, import_querystring_parser.parseQueryString)(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : void 0,
        protocol,
        path: pathname,
        query
    };
}, "parseUrl");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 32669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fromBase64 = void 0;
const util_buffer_from_1 = __webpack_require__(18210);
const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
const fromBase64 = (input)=>{
    if (input.length * 3 % 4 !== 0) {
        throw new TypeError(`Incorrect padding on base64 string.`);
    }
    if (!BASE64_REGEX.exec(input)) {
        throw new TypeError(`Invalid base64 string.`);
    }
    const buffer = (0, util_buffer_from_1.fromString)(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};
exports.fromBase64 = fromBase64;


/***/ }),

/***/ 57337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, __webpack_require__(32669), module.exports);
__reExport(src_exports, __webpack_require__(24954), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 24954:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.toBase64 = void 0;
const util_buffer_from_1 = __webpack_require__(18210);
const util_utf8_1 = __webpack_require__(3278);
const toBase64 = (_input)=>{
    let input;
    if (typeof _input === "string") {
        input = (0, util_utf8_1.fromUtf8)(_input);
    } else {
        input = _input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
    }
    return (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("base64");
};
exports.toBase64 = toBase64;


/***/ }),

/***/ 18210:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    fromArrayBuffer: ()=>fromArrayBuffer,
    fromString: ()=>fromString
});
module.exports = __toCommonJS(src_exports);
var import_is_array_buffer = __webpack_require__(45220);
var import_buffer = __webpack_require__(14300);
var fromArrayBuffer = /* @__PURE__ */ __name((input, offset = 0, length = input.byteLength - offset)=>{
    if (!(0, import_is_array_buffer.isArrayBuffer)(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
    }
    return import_buffer.Buffer.from(input, offset, length);
}, "fromArrayBuffer");
var fromString = /* @__PURE__ */ __name((input, encoding)=>{
    if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
    }
    return encoding ? import_buffer.Buffer.from(input, encoding) : import_buffer.Buffer.from(input);
}, "fromString");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 80919:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    SelectorType: ()=>SelectorType,
    booleanSelector: ()=>booleanSelector,
    numberSelector: ()=>numberSelector
});
module.exports = __toCommonJS(src_exports);
// src/booleanSelector.ts
var booleanSelector = /* @__PURE__ */ __name((obj, key, type)=>{
    if (!(key in obj)) return void 0;
    if (obj[key] === "true") return true;
    if (obj[key] === "false") return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
}, "booleanSelector");
// src/numberSelector.ts
var numberSelector = /* @__PURE__ */ __name((obj, key, type)=>{
    if (!(key in obj)) return void 0;
    const numberValue = parseInt(obj[key], 10);
    if (Number.isNaN(numberValue)) {
        throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);
    }
    return numberValue;
}, "numberSelector");
// src/types.ts
var SelectorType = /* @__PURE__ */ ((SelectorType2)=>{
    SelectorType2["ENV"] = "env";
    SelectorType2["CONFIG"] = "shared config entry";
    return SelectorType2;
})(SelectorType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 37814:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    fromHex: ()=>fromHex,
    toHex: ()=>toHex
});
module.exports = __toCommonJS(src_exports);
var SHORT_TO_HEX = {};
var HEX_TO_SHORT = {};
for(let i = 0; i < 256; i++){
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for(let i = 0; i < encoded.length; i += 2){
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        } else {
            throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
    }
    return out;
}
__name(fromHex, "fromHex");
function toHex(bytes) {
    let out = "";
    for(let i = 0; i < bytes.byteLength; i++){
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}
__name(toHex, "toHex");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 20362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    getSmithyContext: ()=>getSmithyContext,
    normalizeProvider: ()=>normalizeProvider
});
module.exports = __toCommonJS(src_exports);
// src/getSmithyContext.ts
var import_types = __webpack_require__(82491);
var getSmithyContext = /* @__PURE__ */ __name((context)=>context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
// src/normalizeProvider.ts
var normalizeProvider = /* @__PURE__ */ __name((input)=>{
    if (typeof input === "function") return input;
    const promisified = Promise.resolve(input);
    return ()=>promisified;
}, "normalizeProvider");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 71181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getAwsChunkedEncodingStream = void 0;
const stream_1 = __webpack_require__(12781);
const getAwsChunkedEncodingStream = (readableStream, options)=>{
    const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
    const checksumRequired = base64Encoder !== undefined && checksumAlgorithmFn !== undefined && checksumLocationName !== undefined && streamHasher !== undefined;
    const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : undefined;
    const awsChunkedEncodingStream = new stream_1.Readable({
        read: ()=>{}
    });
    readableStream.on("data", (data)=>{
        const length = bodyLengthChecker(data) || 0;
        awsChunkedEncodingStream.push(`${length.toString(16)}\r\n`);
        awsChunkedEncodingStream.push(data);
        awsChunkedEncodingStream.push("\r\n");
    });
    readableStream.on("end", async ()=>{
        awsChunkedEncodingStream.push(`0\r\n`);
        if (checksumRequired) {
            const checksum = base64Encoder(await digest);
            awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r\n`);
            awsChunkedEncodingStream.push(`\r\n`);
        }
        awsChunkedEncodingStream.push(null);
    });
    return awsChunkedEncodingStream;
};
exports.getAwsChunkedEncodingStream = getAwsChunkedEncodingStream;


/***/ }),

/***/ 28750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Uint8ArrayBlobAdapter: ()=>Uint8ArrayBlobAdapter
});
module.exports = __toCommonJS(src_exports);
// src/blob/transforms.ts
var import_util_base64 = __webpack_require__(57337);
var import_util_utf8 = __webpack_require__(3278);
function transformToString(payload, encoding = "utf-8") {
    if (encoding === "base64") {
        return (0, import_util_base64.toBase64)(payload);
    }
    return (0, import_util_utf8.toUtf8)(payload);
}
__name(transformToString, "transformToString");
function transformFromString(str, encoding) {
    if (encoding === "base64") {
        return Uint8ArrayBlobAdapter.mutate((0, import_util_base64.fromBase64)(str));
    }
    return Uint8ArrayBlobAdapter.mutate((0, import_util_utf8.fromUtf8)(str));
}
__name(transformFromString, "transformFromString");
// src/blob/Uint8ArrayBlobAdapter.ts
var _Uint8ArrayBlobAdapter = class _Uint8ArrayBlobAdapter extends Uint8Array {
    /**
   * @param source - such as a string or Stream.
   * @returns a new Uint8ArrayBlobAdapter extending Uint8Array.
   */ static fromString(source, encoding = "utf-8") {
        switch(typeof source){
            case "string":
                return transformFromString(source, encoding);
            default:
                throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
        }
    }
    /**
   * @param source - Uint8Array to be mutated.
   * @returns the same Uint8Array but with prototype switched to Uint8ArrayBlobAdapter.
   */ static mutate(source) {
        Object.setPrototypeOf(source, _Uint8ArrayBlobAdapter.prototype);
        return source;
    }
    /**
   * @param encoding - default 'utf-8'.
   * @returns the blob as string.
   */ transformToString(encoding = "utf-8") {
        return transformToString(this, encoding);
    }
};
__name(_Uint8ArrayBlobAdapter, "Uint8ArrayBlobAdapter");
var Uint8ArrayBlobAdapter = _Uint8ArrayBlobAdapter;
// src/index.ts
__reExport(src_exports, __webpack_require__(71181), module.exports);
__reExport(src_exports, __webpack_require__(44148), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 44148:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.sdkStreamMixin = void 0;
const node_http_handler_1 = __webpack_require__(35985);
const util_buffer_from_1 = __webpack_require__(18210);
const stream_1 = __webpack_require__(12781);
const util_1 = __webpack_require__(73837);
const ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdkStreamMixin = (stream)=>{
    var _a, _b;
    if (!(stream instanceof stream_1.Readable)) {
        const name = ((_b = (_a = stream === null || stream === void 0 ? void 0 : stream.__proto__) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) || stream;
        throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
    }
    let transformed = false;
    const transformToByteArray = async ()=>{
        if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0, node_http_handler_1.streamCollector)(stream);
    };
    return Object.assign(stream, {
        transformToByteArray,
        transformToString: async (encoding)=>{
            const buf = await transformToByteArray();
            if (encoding === undefined || Buffer.isEncoding(encoding)) {
                return (0, util_buffer_from_1.fromArrayBuffer)(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
            } else {
                const decoder = new util_1.TextDecoder(encoding);
                return decoder.decode(buf);
            }
        },
        transformToWebStream: ()=>{
            if (transformed) {
                throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            if (stream.readableFlowing !== null) {
                throw new Error("The stream has been consumed by other callbacks.");
            }
            if (typeof stream_1.Readable.toWeb !== "function") {
                throw new Error("Readable.toWeb() is not supported. Please make sure you are using Node.js >= 17.0.0, or polyfill is available.");
            }
            transformed = true;
            return stream_1.Readable.toWeb(stream);
        }
    });
};
exports.sdkStreamMixin = sdkStreamMixin;


/***/ }),

/***/ 89521:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    escapeUri: ()=>escapeUri,
    escapeUriPath: ()=>escapeUriPath
});
module.exports = __toCommonJS(src_exports);
// src/escape-uri.ts
var escapeUri = /* @__PURE__ */ __name((uri)=>// AWS percent-encodes some extra non-standard characters in a URI
    encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode), "escapeUri");
var hexEncode = /* @__PURE__ */ __name((c)=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode");
// src/escape-uri-path.ts
var escapeUriPath = /* @__PURE__ */ __name((uri)=>uri.split("/").map(escapeUri).join("/"), "escapeUriPath");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 3278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    fromUtf8: ()=>fromUtf8,
    toUint8Array: ()=>toUint8Array,
    toUtf8: ()=>toUtf8
});
module.exports = __toCommonJS(src_exports);
// src/fromUtf8.ts
var import_util_buffer_from = __webpack_require__(18210);
var fromUtf8 = /* @__PURE__ */ __name((input)=>{
    const buf = (0, import_util_buffer_from.fromString)(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
}, "fromUtf8");
// src/toUint8Array.ts
var toUint8Array = /* @__PURE__ */ __name((data)=>{
    if (typeof data === "string") {
        return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}, "toUint8Array");
// src/toUtf8.ts
var toUtf8 = /* @__PURE__ */ __name((input)=>{
    if (typeof input === "string") {
        return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return (0, import_util_buffer_from.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
}, "toUtf8");
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 51063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ esm_node_v4)
});

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/native.js

/* harmony default export */ const esm_node_native = ({
    randomUUID: (external_crypto_default()).randomUUID
});

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/rng.js

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        external_crypto_default().randomFillSync(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!validate(uuid)) {
        throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
}
/* harmony default export */ const esm_node_stringify = ((/* unused pure expression or super */ null && (stringify)));

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-node/v4.js



function v4(options, buf, offset) {
    if (esm_node_native.randomUUID && !buf && !options) {
        return esm_node_native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return unsafeStringify(rnds);
}
/* harmony default export */ const esm_node_v4 = (v4);


/***/ })

};
;
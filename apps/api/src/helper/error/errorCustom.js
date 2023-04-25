import { httpStatusCodes } from "./httpStatusCode.js";

export class BaseError extends Error {
    /**
     * @type {Number}
     */
    statusCode;

    /**
     * @type {Boolean}
     */
    isOperational;

    /**
     * @type {String}
     */
    message;

    /**
     * @param {String} message 
     */
    constructor(message) {
        super(message)
        this.message = message
        this.name = "operationalError"
    }
}

export class Api404Error extends BaseError {
    /**
     * @type {Number}
     */
    statusCode;

    /**
     * @type {Boolean}
     */
    isOperational;

    /**
     * @type {String}
     */
    message;
    
    /**
     * @param {String} message 
     */
    constructor(message) {
        super(message);
        this.message = message
        this.statusCode = httpStatusCodes.NOT_FOUND;
        this.isOperational = true;
    }
}
export class Api400Error extends BaseError {
    /**
     * @type {Number}
     */
    statusCode;

    /**
     * @type {Boolean}
     */
    isOperational;

    /**
     * @type {String}
     */
    message;
    
    /**
     * @param {String} message 
     */
    constructor(message) {
        super(message);
        this.message = message
        this.statusCode = httpStatusCodes.BAD_REQUEST;
        this.isOperational = true;
    }
}
export class Api500Error extends BaseError {
    /**
     * @type {Number}
     */
    statusCode;

    /**
     * @type {Boolean}
     */
    isOperational;

    /**
     * @type {String}
     */
    message;
    
    /**
     * @param {String} message 
     */
    constructor(message) {
        super(message);
        this.message = message
        this.statusCode = httpStatusCodes.INTERNAL_SERVER;
        this.isOperational = true;
    }
}

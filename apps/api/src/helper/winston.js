import { createLogger, transports, format} from "winston"
import appRoot from "app-root-path"
import dotenv from "dotenv";
dotenv.config();

export const logger = createLogger({
    level: 'debug',
    format : format.json(),
    transports: [
        new transports.File({
            filename: `${appRoot.path}/logs/server/error.log`, level: 'error',
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD hh:mm:ss A ZZ"
                }),
                format.json()
            ),
            handleExceptions: true
        }),
        new transports.File({
            filename: `${appRoot.path}/logs/server/info.log`, level: 'info',
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD hh:mm:ss A ZZ"
                }),
                format.json()
            ),
            handleExceptions: true
        }),
    
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple(),
        })
    )
}



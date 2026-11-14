import { HttpException, HttpStatus, UnprocessableEntityException, ValidationError } from "@nestjs/common";

export function exceptionFactory(validationErrors: ValidationError[]) {
    const errors = validationErrors.flatMap((err) => Object.values(err.constraints!).map(i => Number.parseInt(i)));
    return new HttpException(
        errors,
        HttpStatus.UNPROCESSABLE_ENTITY
    );
}
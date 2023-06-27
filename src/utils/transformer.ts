import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

const toNumber = (transformParams: TransformFnParams) => {
  const numberValue = parseInt(transformParams.value);

  if (Number.isNaN(numberValue))
    throw new BadRequestException(`${transformParams.key} is not a number.`);
  return numberValue;
};

export { toNumber };

import { RandToken } from '../../../../shared/domain/value-object/RandToken';

export default class UserTokenPK extends RandToken {
  constructor(value: string){
    super(`pk_test_${value}`)
  }
}

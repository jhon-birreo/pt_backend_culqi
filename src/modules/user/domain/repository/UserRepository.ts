import { Nullable } from '../../../../shared/domain/types/Nullable';
import { User } from '../entity/User';
import { UserId } from '../entity/UserId';

export interface UserRepository {
	save(user: User): Promise<void>;
	getUser(id: UserId): Promise<Nullable<User>>;
}

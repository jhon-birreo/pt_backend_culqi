import { Nullable } from '../../../shared/domain/types/Nullable';
import { TimeLine } from '../../../shared/domain/value-object/TimeLine';
import { User } from '../domain/entity/User';
import { UserEmail } from '../domain/entity/UserEmail';
import { UserId } from '../domain/entity/UserId';
import { UserName } from '../domain/entity/UserName';
import { UserPassword } from '../domain/entity/UserPassword';
import { UserRequest } from '../domain/interface/UserRequest';
import { UserRepository } from '../domain/repository/UserRepository';

export class UserCreator {
	private readonly repository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.repository = userRepository;
	}

	async run(request: UserRequest): Promise<Nullable<User>> {
		const user = User.create(
			UserId.generateRamdom(),
			new UserEmail(request.email),
			new UserPassword(request.password),
			new UserName(request.name),
			TimeLine.fromPrimitives({
				created: new Date().toISOString(),
				updated: null,
				deleted: null
			})
		);

		await this.repository.save(user);

		return user;
	}
}

import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';

export class LoginUseCase {

    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(email: string, password: string): Promise<User> {

        
        // Llamamos al repo
        const user = await this.authRepository.login(email, password);
        
        //  Retornamos el usuario
        return user;
    }
}
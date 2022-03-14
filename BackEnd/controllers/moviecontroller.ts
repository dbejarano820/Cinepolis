import { movie_data } from '../repositories/data_movie';

export class MovieController {

    private static instance: MovieController;
    private movie_repo: any;

    private constructor() {
        this.movie_repo = new movie_data();
        // this.data_repo = new offer_data();
    }

    public static getInstance(): MovieController {
        if (!this.instance) {
            this.instance = new MovieController();
        }
        return this.instance;
    }

    public async createMovie(info: any): Promise<any> {
        const response = await this.movie_repo.create(info);
        return Promise.resolve("Todo gucci")
    }

    public async listMovies(info: any): Promise<any> {
        return this.movie_repo.list();
    }
}

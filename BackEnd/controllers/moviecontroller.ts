import { QueryResult } from 'pg';
import { movie_data } from '../repositories/data_movie';

export default class MovieController {

    private static instance: MovieController;
    private movie_repo: movie_data;

    private constructor() {
        this.movie_repo = new movie_data();
    }

    public static getInstance(): MovieController {
        if (!this.instance) {
            this.instance = new MovieController();
        }
        return this.instance;
    }

    public async listSalas(): Promise<QueryResult<any>> {
        return this.movie_repo.listSalas();
    }

    public async listMovies(): Promise<QueryResult<any>> {
        return this.movie_repo.listMovies();
    }

    public async getTandas(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.getTandasForMovie(info);
    }

    public async getTanda(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.getTanda(info);
    }

    public async getMovie(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.getMovie(info);
    }

    public async getListing(): Promise<QueryResult<any>> {
        return this.movie_repo.getListing();
    }

    public async getSeats(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.getSeats(info);
    }

    public async createReservation(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.createReservation(info);
    }

    public async deactiveReservation(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.deactiveReservation(info);
    }

    public async reserveSeat(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.reserveSeat(info);
    }

    public async reserveFood(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.reserveFood(info);
    }

    public async addChart(info: any): Promise<QueryResult<any>> {
        return this.movie_repo.addChart(info);
    }    

    public async delete(data : any): Promise<QueryResult<any>> {  
      return this.movie_repo.delete(data);
    }
}

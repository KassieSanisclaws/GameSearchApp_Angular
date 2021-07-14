import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { APIResponse, Game } from '../models/gamemodels';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {

  constructor(private http: HttpClient) { }

// this method below is responsible for fetching the list of all the games in the database. //
  // this method receives 2 argumanets ordering and search. //
  getGameList(
    ordering: string,
    search?: string
// the below is the interface from the model created to get the games. //
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
// the below is the function of the search box appended to params. //
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
// the below rerturns the api responsefrom interface and game interface models. showing the relations of the data.//
    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, {
      params: params,
    });
  }

  
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${environment.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${environment.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${environment.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }

}

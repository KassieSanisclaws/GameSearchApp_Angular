import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models/gamemodels';
import { VideoGameService } from '../../services/video-game.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
         public sort: string; // this public method of serach holds as string value in array search. //
         public games: Array<Game>; // this public property holds the array of game. //
         private routeSub: Subscription; // this monitors the subscription and can be accessed to unsubscribe and implement onDestroy method for memory leaks. //
         private gameSub: Subscription;  // this monitors the subscription and can be accessed to unsubscribe and implement onDestroy method for memory leaks. //

  constructor(private videoGameService: VideoGameService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // the ngOnInit si the fust component that runs first in application before the methods. //
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {  // this line is to check at first when the application loads if there is a querry of games in the search. //
        this.searchGames('metacrit', params['game-search']); // this is a method that is created to 
      } else {
        this.searchGames('metacrit');
      }
    });
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the below is the search game method for search. //  
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.videoGameService
      .getGameList(sort, search) // this method accepts (2) (perameters meaning arguments). //
      .subscribe((gameList:APIResponse<Game>) => {  // this line subscribes to the response to run thet above acctiona dn links it with the api interface from the model and pulls that data according to the interface model. //
        this.games = gameList.results;  // this line tales the response and returns it as a result.//
        console.log(gameList);    // this line displays the rrulst in the console. //
      });
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the below re-routes the clicked image to the details page by ID as a string. //
  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this function method destroys after close of the browser. //
  ngOnDestroy(): void {
    if (this.gameSub) {  // if the gameSub 
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}


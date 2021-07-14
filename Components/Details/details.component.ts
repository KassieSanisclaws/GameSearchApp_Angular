import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

///////////////////////////////////////////////////////////////////////////////////////////
// the below is the model imports. //
import { Game } from 'src/app/models/gamemodels';

///////////////////////////////////////////////////////////////////////////////////////////
// the below is the service imports. //
import { VideoGameService } from 'src/app/services/video-game.service';

//////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy{
        gameRating = 0;
        gameId: string;
        game: Game;
        routeSub: Subscription;
        gameSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private videoGameSerice: VideoGameService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

// the below is a game method to get the game list details. //  
  getGameDetails(id: string): void {
    this.gameSub = this.videoGameSerice
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        
// this time-out is for user to sync with the loading of the page. //
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
}

// the belownis the function for the videop game rating managed by the backend api open source key. //
getColor(value: number): string {
  if (value > 75) {
    return '#5ee432';
  } else if (value > 50) {
    return '#fffa50';
  } else if (value > 30) {
    return '#f7aa38';
  } else {
    return '#ef4655';
  }
}

ngOnDestroy(): void {
  if (this.gameSub) {
    this.gameSub.unsubscribe();
  }

  if (this.routeSub) {
    this.routeSub.unsubscribe();
  }
}

}

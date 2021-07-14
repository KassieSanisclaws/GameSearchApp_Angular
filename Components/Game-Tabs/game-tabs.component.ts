import { Component, Input, OnInit } from '@angular/core';

//////////////////////////////////////////////////////////////////////////////
// the below is the model imports. //
import { Game } from 'src/app/models/gamemodels';

////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
    @Input() game: Game;  // this is the input property which we are receiving the game data. //
  constructor() { }

  ngOnInit(): void {
  }

}

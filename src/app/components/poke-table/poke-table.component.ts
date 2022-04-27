import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: String[] = ['Position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData;

    for (let i = 1; i < 150; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          }
          this.data.push(pokemonData);
          this.datasource = new MatTableDataSource<any>(this.data);
          this.datasource.paginator = this.paginator;
          console.log(res);
        },
        error => {
          console.error(error);
        }
      )
    }

  }

}

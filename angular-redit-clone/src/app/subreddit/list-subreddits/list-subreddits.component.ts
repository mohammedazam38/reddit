/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../Subreddit.response';
import { SubredditService } from '../subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {
  subreddits: Array<SubredditModel>;
  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    try {
      this.subredditService.getAllSubreddits().subscribe(data => {
        this.subreddits = data;
      });
    }
    catch {
      throw (Error);
    }

  }
}

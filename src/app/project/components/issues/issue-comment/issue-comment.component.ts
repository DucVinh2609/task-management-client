import { Component, Input, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JJobs } from '@trungk18/interface/job';
import { JUser } from '@trungk18/interface/user';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import { JobsService } from '@trungk18/project/services/jobs.service';

@Component({
  selector: 'issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
@UntilDestroy()
export class IssueCommentComponent implements OnInit {
  @Input() job: JJobs;
  description: string = '';
  user: JUser;
  isEditing: boolean;

  constructor(private _authQuery: AuthQuery, private jobsService: JobsService) {}

  ngOnInit(): void {
    this.description = this.jobsService.getJobsInfo(this.job.id).description;
  }

  setCommentEdit(mode: boolean) {
    this.isEditing = mode;
  }

  addComment() {
    console.log(this.description);
    this.jobsService.updateJobs({
      ...this.job,
      description: this.description
    });
    this.cancelAddComment();
  }

  cancelAddComment() {
    this.description = this.jobsService.getJobsInfo(this.job.id).description;
    this.setCommentEdit(false);
  }
}

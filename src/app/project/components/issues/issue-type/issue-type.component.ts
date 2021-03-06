import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssueType, JIssue } from '@trungk18/interface/issue';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectConst } from '@trungk18/project/config/const';

@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue.issueTypeId);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private _projectService: ProjectService) {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  ngOnInit() {}

  ngOnChanges(): void {}

  updateIssue(issueTypeId) {
    this._projectService.updateIssue({
      ...this.issue,
      issueTypeId: issueTypeId
    });
  }

  isTypeSelected(issueTypeId) {
    return this.issue.issueTypeId === issueTypeId;
  }
}

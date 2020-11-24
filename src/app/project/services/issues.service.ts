import { Injectable } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import dummy from 'src/assets/data/project.json';
import { DateUtil } from '@trungk18/project/utils/date';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  issues: JIssue;

  constructor() { }

  getAllIssueInStatus (statusId: number) {
    return dummy.issues.filter(j => j.issueStatusId == statusId).sort((a, b) => (a.listPosition > b.listPosition) ? 1 : -1);;
  }

  addIssue(issue: JIssue) {
    dummy.issues.push(issue)
  }

  getListUsersInIssue(issueId: string) {
    return dummy.issues.filter(j => j.id == issueId)[0].userIds;
  }

  getInfoIssue(issueId: string) {
    return dummy.issues.filter(j => j.id == issueId)[0];
  }

  updateIssue(issue: JIssue) {
    let issueUpdate = dummy.issues.filter(i => i.id == issue.id)[0];
    let updatedAt = DateUtil.getNow();
    if(issueUpdate) {
      issueUpdate.updatedAt = updatedAt;
      issueUpdate.issueStatusId = issue.issueStatusId;
      issueUpdate.title = issue.title;
      issueUpdate.deadlineAt = issue.updatedAt;
      issueUpdate.userIds = issue.userIds;
      issueUpdate.issuePriorityId = issue.issuePriorityId;
    }
    console.log(issueUpdate);
  }

  deleteIssue(issueId: string) {
    const index = dummy.issues.findIndex(x => x.id === issueId);
    if (index !== undefined) dummy.issues.splice(index, 1);
  }
}

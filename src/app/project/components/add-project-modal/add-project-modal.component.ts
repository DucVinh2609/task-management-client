import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JProjectCategories, JProjects } from '@trungk18/interface/project'
import { quillConfiguration } from '@trungk18/project/config/editor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { JUser } from '@trungk18/interface/user';
import { tap } from 'rxjs/operators';
import { until } from 'protractor';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import { DateUtil } from '@trungk18/project/utils/date';
import dummy from 'src/assets/data/project.json';
import { ProjectsService} from '@trungk18/project/services/projects.service';
import { UsersService } from '@trungk18/project/services/users.service';
import { Router } from '@angular/router';
import { AuthQuery } from '@trungk18/project/auth/auth.query';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
@UntilDestroy()
export class AddProjectModalComponent implements OnInit {
  reporterUsers$: Observable<JUser[]>;
  assignees$: Observable<JUser[]>;
  issueForm: FormGroup;
  editorOptions = quillConfiguration;
  priorities: JProjectCategories[] = dummy.categories;
  currentUserId: string = localStorage.getItem('token');
  currentUser: JUser;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService,
    public _projectQuery: ProjectQuery,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    public router: Router,
    public authQuery: AuthQuery
  ) {}

  ngOnInit(): void {
    this.currentUser = this.usersService.getUsersById(this.currentUserId);
    this.initForm();
    this.reporterUsers$ = this._projectQuery.users$.pipe(
      untilDestroyed(this),
      tap((users) => {
        let [user] = users;
        if (user) {
          this.f.reporterId.patchValue(user.id);
        }
      })
    );

    this.assignees$ = this._projectQuery.users$;
  }

  initForm() {
    this.issueForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      projectCategoriesId: [1]
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    let now = DateUtil.getNow();
    let newProject: JProjects = {
      ...this.issueForm.getRawValue(),
      createdAt: now,
      updatedAt: null,
      description: null
    };

    let newProjectId = this.projectsService.createProject(newProject);
    this.usersService.updateAdminProjects(this.currentUserId, newProjectId);
    this.closeModal();
    // window.location.href = '/project/board/' + newProject.name;
    this.router.navigate(['/project/board/' + newProject.name]);
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._modalRef.close();
  }
}

import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { ProjectData, projects, tasks } from '../mock/data';
import Project from '../schemas/project';

@Resolver(of => Project)
export default class {
  @Query(returns => Project, { nullable: true })
  projectByName(@Arg('name') name: string): ProjectData | undefined {
    return projects.find(project => project.name === name);
  }

  @FieldResolver()
  tasks(@Root() projectData: ProjectData) {
    return tasks.filter(task => {
      return task.project_id === projectData.id;
    });
  }
}
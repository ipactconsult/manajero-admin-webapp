import { Observable } from "rxjs";
import { Project } from "../models/Project";
import { ProjectService } from "../services/project/project.service";

export function removeElementFromArray(arr: any[], id: any) {
  return arr.filter(function (element) {
    return element.id != id;
  });
}
export function UpdateItem(newData, array, selectedItem): any[] {
  
  newData.id = selectedItem.id;
  const index = array.findIndex((unit) => unit.id === selectedItem.id);
  array[index] = newData;
  console.log(array);
  
  return array;
}
export function truncate_with_ellipsis(s) {
  if (s.length > 20) {
     return s.substring(0, 30) + '...';
  }
  return s;
};
export  async function getAllActiveProjects(projectService: ProjectService):Promise<Project[]>
{
  let list:Project[] ;

 projectService.findAllActiveProject().subscribe({
    next: (result: any) => {
      list = result;

    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {

      return list;
    }
  });
  
  return list;
}

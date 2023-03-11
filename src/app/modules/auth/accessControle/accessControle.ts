export function accessControlProjectManagement(currentUser, menu) {
  const accessControl = currentUser.roles?.filter(
    (role) => role === "ROLE_ADMIN" || role === "PROJECT_MANAGER"
  ).length;
  if (accessControl === 0) {
    const  projectManagementMenu = menu.filter(
      (item) => item.title === "Project Management"
    )[0];
    const charter = projectManagementMenu.children.filter(
      (item) => (item.title !== "Project Charter"&&item.title !== "Projects")
    );
   
    projectManagementMenu.children = [];
    projectManagementMenu.children = [...charter];
  
    
    menu.forEach((item) => {
      if (item.title === "Project Management") {
        item = projectManagementMenu;
      }
    });
    
  }
  else  if(adminAccess(currentUser))
  {
    const  projectManagementMenu = menu.filter(
      (item) => item.title === "Project Management"
    )[0];    
    const charter = projectManagementMenu.children.filter(
      (item) => (item.title !== "Shared Projects")
    );
   
    projectManagementMenu.children = [];
    projectManagementMenu.children = [...charter];
    menu.forEach((item) => {
      if (item.title === "Project Management") {
        item = projectManagementMenu;
      }
    });
  }
  
 

  return menu;
}
export function superAccess(currentUser) {
  const accessControl = currentUser.roles?.filter(
    (role) => role === "ROLE_ADMIN" || role === "PROJECT_MANAGER"
  ).length;
  

  if (accessControl === 0) {
    return false;
  } else {
    return true;
  }
}
  export function adminAccess(currentUser) {

    const accessControl = currentUser.roles?.filter(
      (role) => role === "ROLE_ADMIN" 
    ).length;
    
  
    if (accessControl === 0) {
      return false;
    } else {
      return true;
    }

}

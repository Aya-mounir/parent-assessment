import { Subcategory } from '../../../../../../4th/GP/admin-panel/src/app/core/interfaces/subCategory';
import { Category } from 'src/app/core/interfaces/category';
export const ApiUrls = {
  Auth:{
    login:"Auth/Login",
    de_Activate:"Auth/Deactivate"
  },
  Category:{
    view:"Category",
    update:"Category/update",
    Subcategory:"Subcategory"
  },
  Admin:{
    add:"Auth/RegisterAdmin",
    get:"Admin",
  },
  Customer:{
    get:"Customer"
  },
  Provider:{
    get:"Provider"
  },
  service:{
    allDetails:"ServiceRequest/AllServicesDetails",
    get:"ServiceRequest",
    updateCategory:"ServiceRequest/UpdateUnknownSubcategory",
    updateMaxFees:"ServiceRequest/UpdateMaxFees"
  }
}

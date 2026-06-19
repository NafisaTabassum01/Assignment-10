// import React from 'react';
// import AddProductForm from './AddProductForm';
// import { getLoggedinUserProfile } from '@/lib/api/products';

// const PostProductPage = async () => {

// const seller = await getLoggedinUserProfile();

//     return (
//         <div>
//             <AddProductForm seller={seller}></AddProductForm>
//         </div>
//     );
// };

// export default PostProductPage;
// import React from 'react';
// import AddProductForm from './AddProductForm';
// import { getLoggedinSellerProfile } from '@/lib/api/products';

// const PostProductPage = async () => {

//   const seller = await getLoggedinSellerProfile();

//   return (
//     <div>
//       <AddProductForm seller={seller} />
//     </div>
//   );
// };

// export default PostProductPage;

import React from 'react';
import AddProductForm from './AddProductForm';
import { getLoggedinSellerProfile } from '@/lib/api/products';


const PostProductPage = async () => {
  const seller = await getLoggedinSellerProfile();

  if (!seller || !seller._id) {
    return <div>No seller found. Please complete profile first.</div>;
  }

  return <AddProductForm seller={seller} />;
};
export default PostProductPage;

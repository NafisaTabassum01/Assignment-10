import React from 'react';
import SellerProfile from './SellerProfile';
import { getUserSession } from '@/lib/core/session';
import { getSellerProfile } from '@/lib/api/seller';

const Profilepage = async () => {

const user = await getUserSession();
// console.log(user)
const seller = await getSellerProfile(user?.id)

    return (
        <div>
            <SellerProfile seller={user} getSeller={seller}></SellerProfile>
        </div>
    );
};

export default Profilepage;
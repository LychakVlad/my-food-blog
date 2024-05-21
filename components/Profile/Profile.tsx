import React, { FC } from "react";
import withAuth from "../Routes/withAuth";
import { IProfileProps } from "types/profile.interface";
import RecipeList from "../Recipe/RecipeList";

const Profile: FC<IProfileProps> = ({
  name,
  desc,
  data,
  totalRecipes,
  loading,
  isError,
  handleEdit,
  handleDelete,
  paginate,
}) => {
  console.log(data);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <RecipeList
        data={data}
        totalRecipes={totalRecipes}
        loading={loading}
        isError={isError}
        paginate={paginate}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default withAuth(Profile);

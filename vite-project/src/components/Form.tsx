import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  categories: string[];
}

const Form = ({ categories }: Props) => {
  const schema = z.object({
    description: z
      .string()
      .trim()
      .min(3, { message: "Description should be at least 3 characters" }),
    amount: z.number({ invalid_type_error: "This field is required" }).min(0),
    category: z.string().min(1, "This field is required"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  console.log(errors);
  const onFormSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;

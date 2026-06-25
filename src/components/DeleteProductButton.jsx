"use client";

import {
  AlertDialog,
  Button,
} from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DeleteProductButton = ({
  productId,
  title,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    router.refresh();
  };

  return (
    <AlertDialog>
      <Button
        isIconOnly
        variant="light"
        className="text-rose-500"
      >
        <FiTrash2 />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Product?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently
                delete
                <strong>
                  {" "}
                  {title}
                </strong>
                .
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
              >
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger"
                onPress={handleDelete}
              >
                Delete
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteProductButton;
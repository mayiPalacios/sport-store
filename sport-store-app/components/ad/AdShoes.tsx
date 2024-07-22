import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

import { HeartIcon } from "@/public/icons/HeartIcon";
import shoe from "@/public/images/image.png";

export default function AdShoes() {
  return (
    <section className="py-36">
      <div className="container flex items-center justify-center">
        <Card className="py-4 lg:w-3/4 xl:w-1/2">
          <CardBody className="overflow-visible py-2">
            <div className="flex gap-6">
              <Image alt="Shoe" className="flex-1 object-cover" src={shoe} />
              <div className="flex-1">
                <h2 className="text-lg font-bold uppercase">
                  Nike Adapt BB 2.0
                </h2>
                <p className="text-sm text-default-500">
                  Consistent, customized fit, game-changing.
                </p>

                <div className="mb-6 mt-2 flex gap-3">
                  <span className="font-bold">$279.79</span>
                  <span className="text-default-600 line-through">$350</span>
                  <span className="text-success">20% off</span>
                </div>

                <div className="mt-6 flex gap-6">
                  <div className="flex gap-4 items-center">
                    <Button isIconOnly aria-label="Like" color="danger">
                      <HeartIcon
                        height={20}
                        label={undefined}
                        size={20}
                        width={20}
                      />
                    </Button>
                  </div>
                  <Button color="primary" radius="full" variant="bordered">
                    Add to bag
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

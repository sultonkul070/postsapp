import React from 'react';
import { ListGroup } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <div>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>About The App</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus in
            sequi voluptas aspernatur inventore expedita dolorem, dolor quidem
            molestiae ex illum vero? Quibusdam rem autem dignissimos velit
            alias, illum blanditiis sint ullam magnam possimus temporibus nisi
            corporis repellendus ut eius deserunt. Nobis illo quo quia, vel ab
            asperiores sed doloremque!
          </p>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default AboutScreen;

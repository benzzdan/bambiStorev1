import React from 'react';

const ProductImage = props => {
    let file;
    let fileId;
    let placeholder =
        'https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

    var isThereMainImage = product => {
        fileId = props.product.relationships.main_image.data.id;

        file = props.products.included.main_images.find(function (el) {
            return fileId === el.id;
        });


        return (
            (
                <img
                    alt={props.product.name + '-' + props.product.description}
                    src={file.link.href}
                    className="responsive-img"
                    style={{ width: props.size ? props.size : "100%" }}
                />
            ) || <img alt="placeholder" src={placeholder}

                className="responsive-img"
            />
        );

    };

    var isThereAFile = product => {
        try {
            fileId = props.product.relationships.files.data[0].id;
            file = props.products.included.files.find(function (el) {
                return fileId === el.id;
            });
            return (
                <img
                    alt={props.product.name + ', ' + props.product.description}
                    src={file.link.href}
                />
            );
        } catch (e) {
            return <img alt="placeholder" src={placeholder} />;
        }
    };

    try {
        return isThereMainImage(props.product);
    } catch (e) {
        return isThereAFile(props.product);
    }
};

export default ProductImage;
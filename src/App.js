const App = () => {
    const catagories = [
        {
            id: 1,
            title: 'Hats',
        },
        {
            id: 2,
            title: 'Jackets',
        },
        {
            id: 3,
            title: 'Sneakers',
        },
        {
            id: 4,
            title: 'Womens',
        },
        {
            id: 5,
            title: 'Mens',
        },
    ];
    return (
        <div className="catagories-container">
            {catagories.map((catagory) => (
                <div className="catagory-container">
                    <div className="background-image">{/* <img /> */}</div>
                    <div className="catagory-body-container">
                        <h2>{catagory.title}</h2>
                        <p>Shop Now</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;

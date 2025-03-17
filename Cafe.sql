Table Customer {
    Id INT [primary key]
    Name VARCHAR(100)
    Email VARCHAR(100) [unique]
    Phone VARCHAR(15)
}

Table Orders {
    Order_id INT [primary key]
    Customer_id INT
    Order_date DATE
    Amount DECIMAL(10,2)
    Payment_status VARCHAR(50)
}

Table KOT {
    KOT_id INT [primary key, increment]
    Order_id INT
    Prep_status VARCHAR(50)
    Assigned_barista VARCHAR(100)
    Kitchen_note TEXT
}

Table Dining_Table {
    Table_no INT [primary key]
    Capacity INT
    Status VARCHAR(50)
    Location VARCHAR(100)
}

Table Employee {
    Id INT [primary key]
    Name VARCHAR(100)
    Role VARCHAR(100)
    Salary DECIMAL(10,2)
    Shift VARCHAR(50)
    Contact VARCHAR(15)
}

Table Menu {
    Item_id INT [primary key]
    Name VARCHAR(100)
    Category VARCHAR(100)
    Price DECIMAL(10,2)
    Availability BOOLEAN
}

Table Inventory {
    Item_key INT [primary key]
    Name VARCHAR(100)
    Quantity INT
    Expiry_date DATE
}

Table Supplier {
    Supp_id INT [primary key]
    Name VARCHAR(100)
    Email VARCHAR(100) [unique]
    Contact VARCHAR(15)
    Renewal_time DATE
}

Table Discount_Coupon {
    Code VARCHAR(50) [primary key]
    Discount_amount DECIMAL(10,2)
    Expiry DATE
}

Table Order_Menu {
    Order_id INT
    Item_id INT
    Quantity INT
    primary key (Order_id, Item_id)
}

Table Supplier_Inventory {
    Supp_id INT
    Item_key INT
    primary key (Supp_id, Item_key)
}

Ref: Orders.Customer_id > Customer.Id
Ref: KOT.Order_id > Orders.Order_id
Ref: Order_Menu.Order_id > Orders.Order_id
Ref: Order_Menu.Item_id > Menu.Item_id
Ref: Supplier_Inventory.Supp_id > Supplier.Supp_id
Ref: Supplier_Inventory.Item_key > Inventory.Item_key

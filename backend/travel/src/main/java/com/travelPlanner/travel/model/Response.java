package com.travelPlanner.travel.model;

public abstract class Response<E> {
    public int statusCode;
    public E body;
}

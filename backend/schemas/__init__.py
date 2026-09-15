from pydantic import BaseModel, ConfigDict, Field


class Schema(BaseModel):
    """Accept camelCase or snake_case; serialize with aliases when set."""

    model_config = ConfigDict(
        populate_by_name=True,
        serialize_by_alias=True,
    )


def camel(name: str) -> Field:
    return Field(alias=name)

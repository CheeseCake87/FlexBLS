from app.api.clients.models import Client


def condense_client_address(row: Client, return_short: bool = False) -> str:
    address_start_list = [
        row.building_name,
        row.sub_building_name,
        row.building_number,
        row.sub_building_number,
        row.address_line_1,
    ]
    address_start = " ".join([v for v in address_start_list if v])

    if return_short:
        return f"{address_start if address_start else '-'}{', ' + row.postcode if row.postcode else ''}"

    address_values = [
        address_start,
        row.address_line_2,
        row.address_line_3,
        row.locality,
        row.town_or_city,
        row.county,
        row.district,
        row.postcode,
        row.country,
    ]
    address = ", ".join([v for v in address_values if v])
    if not address:
        return "-"
    return address


def condense_client_name(row: Client) -> str:
    first_name = row.first_name
    last_name = row.last_name
    business_name = row.business_name

    if business_name:
        return f"{business_name} ({first_name} {last_name})"
